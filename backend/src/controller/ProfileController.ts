import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { profileService } from "../service/ProfileService";

export async function profileController(app: FastifyInstance) {
  app.patch(
    "/profile/avatar",
    { preHandler: [app.authenticate] },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { id } = request.user as { id: string };
      const dados = request.body;
      
      try {
        const file = await request.file();
        
        if (!file) {
          return reply.code(400).send({ 
            erro: "Nenhum arquivo foi enviado" 
          });
        }
 
        if (!file.mimetype.startsWith('image/')) {
          return reply.code(400).send({ 
            erro: "Arquivo deve ser uma imagem" 
          });
        }
        
        await profileService.updateAvatarImg(id, file);
        
        return reply.code(200).send({ 
          message: "Avatar atualizado com sucesso" 
        });
        
      } catch (error: any) {
        console.error('Controller error:', error);
        return reply.code(500).send({ 
          erro: error.message || "Erro interno do servidor" 
        });
      }
    }
  );
}
