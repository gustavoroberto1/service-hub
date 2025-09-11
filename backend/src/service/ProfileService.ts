import { createWriteStream } from "fs";
import { mkdir } from "fs/promises";
import path from "path";
import { pipeline } from "stream/promises";
import { prisma } from "../prisma/client";

type UpdateAvatarInput = {
  userId: string;
  filePart: {
    filename: string;
    mimetype: string;
    file: NodeJS.ReadableStream;
  };
};

class ProfileService {
  private readonly uploadsDir = "./uploads/avatars";

  constructor() {
    this.ensureUploadsDir();
  }

  private async ensureUploadsDir() {
    try {
      await mkdir(this.uploadsDir, { recursive: true });
    } catch (error) {
      console.error("Erro ao criar diretório de uploads:", error);
    }
  }

  public async updateAvatarImg(userId: string, filePart: UpdateAvatarInput["filePart"]): Promise<void> {
    if (!filePart) {
      throw new Error("Nenhum arquivo enviado");
    }

    if (!filePart.mimetype.startsWith("image/")) {
      throw new Error("Arquivo deve ser uma imagem");
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(filePart.mimetype)) {
      throw new Error("Formato de imagem não suportado. Use JPEG, PNG ou WebP");
    }

    const fileExtension = path.extname(filePart.filename) || this.getExtensionFromMimetype(filePart.mimetype);
    const fileName = `${userId}_${Date.now()}${fileExtension}`;
    const filePath = path.join(this.uploadsDir, fileName);

    try {
      await pipeline(filePart.file, createWriteStream(filePath));
      const result = await prisma.user.update({
        where: { id: userId },
        data: {
          avatar: `/uploads/avatars/${fileName}`,
          updated_at: new Date(),
        },
      });

      if (!result) {
        throw new Error("Usuário não encontrado");
      }
    } catch (error) {
      try {
        const fs = await import("fs/promises");
        await fs.unlink(filePath);
      } catch (unlinkError) {
        console.error("Erro ao remover arquivo:", unlinkError);
      }
      throw error;
    }
  }

  private getExtensionFromMimetype(mimetype: string): string {
    const mimeToExt: Record<string, string> = {
      "image/jpeg": ".jpg",
      "image/png": ".png",
      "image/webp": ".webp",
    };
    return mimeToExt[mimetype] || ".jpg";
  }
}

export const profileService = new ProfileService();
