// src/@types/fastify-jwt.d.ts
import '@fastify/jwt';
import 'fastify';

declare module '@fastify/jwt' {
  interface FastifyJWT {
    // payload do token
    payload: {
      id: string;
      name: string;
      email: string;
      role: string;
      avatar: string;
      createdAt: string; // se você assina como string ISO
      updatedAt: string;
    };
    // o que request.user terá após jwtVerify()
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
      avatar: string;
      createdAt: string;
      updatedAt: string;
    };
  }
}

declare module 'fastify' {
  interface FastifyInstance {
    authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }
}

export { };

