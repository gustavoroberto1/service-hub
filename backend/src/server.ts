import cors from "@fastify/cors";
import fastifyMultipart from '@fastify/multipart';
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastify from "fastify";
import path from "path";
import { swaggerConfig } from "./config/swagger";
import { profileController } from "./controller/ProfileController";
import { userController } from "./controller/UserController";
import authJwt from "./middleware/authJwt";

const app = fastify();

app.register(cors, {
    origin: true,
    methods: ["GET", "POST", "PATCH", "DELETE"]
});

app.register(fastifyMultipart, {
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  }
});


app.register(fastifySwagger, swaggerConfig as any);
app.register(fastifySwaggerUi, { routePrefix: '/docs', uiConfig: { docExpansion: 'list' } })

app.register(authJwt)
app.register(userController)
app.register(profileController)


app.register(require('@fastify/static'), {
  root: path.join(__dirname, 'uploads'),
  prefix: '/uploads/',
})

const PORT = 3333;
app.listen({ port: PORT }).then(() => {
    console.log(`Backend rodando na porta ${PORT}!`)
})
