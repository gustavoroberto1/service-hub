import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { profileService } from "../service/ProfileService";

export async function profileController(app: FastifyInstance) {
  app.patch(
    "/profile/avatar",
    { preHandler: [app.authenticate] },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { id } = request.user as { id: string };
      
      try {
        // Debug logs
        console.log('Headers:', request.headers);
        console.log('Content-Type:', request.headers['content-type']);
        console.log('Is multipart:', request.isMultipart());
        
        // Pega o arquivo
        const file = await request.file();
        console.log('File received:', file ? 'YES' : 'NO');
        
        if (!file) {
          return reply.code(400).send({ 
            erro: "Nenhum arquivo foi enviado" 
          });
        }
        
        console.log('File details:', {
          filename: file.filename,
          mimetype: file.mimetype,
          encoding: file.encoding
        });
        
        // Valida se é imagem
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
