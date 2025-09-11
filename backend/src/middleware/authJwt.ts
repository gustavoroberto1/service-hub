import fastifyJwt from 'fastify-jwt';
import fp from 'fastify-plugin';

export default fp(async (fastify) => {
  fastify.register(fastifyJwt, {
    secret: process.env.JWT_SECRET || 'dev-secret'
  });

  fastify.decorate('authenticate', async (request, reply) => {
    try {
      await request.jwtVerify(); // <- popula request.user
    } catch (err) {
      return reply.status(401).send({ error: 'Não Autorizado' });
    }
  });
});
