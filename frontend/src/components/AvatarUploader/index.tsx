'use client'
import { useRef, useState } from 'react';
import styles from './styles.module.css';

export default function AvatarUploader() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      uploadAvatar(file);
    }
  };

  const uploadAvatar = async (file: File) => {
    // Validações
    if (!file.type.startsWith('image/')) {
      setUploadStatus('error');
      setErrorMessage('Arquivo deve ser uma imagem');
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB
      setUploadStatus('error');
      setErrorMessage('Arquivo deve ter no máximo 5MB');
      return;
    }

    setIsUploading(true);
    setUploadStatus('idle');
    setErrorMessage('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZkMjhkN2IwLTRmMTUtNDg5ZC1iOGRlLWRlZjE4OGYxNmZlOCIsIm5hbWUiOiJndXN0YXZvIiwiZW1haWwiOiJndXN0YXZvQGdtYWlsLmNvbSIsInJvbGUiOiJOSVZFTF8xIiwiYXZhdGFyIjpudWxsLCJjcmVhdGVkQXQiOiIyMDI1LTA5LTExVDE5OjM5OjA1LjMwOFoiLCJ1cGRhdGVkQXQiOiIyMDI1LTA5LTExVDE5OjM5OjA1LjMwOFoiLCJpYXQiOjE3NTc2MTk1NzR9.h-UFiuLKn26yeqVx1Pu-SfDiCa8wiomj8PFtfzOjVeY';

      const response = await fetch('http://localhost:3333/profile/avatar', {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.erro || 'Erro ao fazer upload');
      }

      setUploadStatus('success');
      
      // Remove status após 3 segundos
      setTimeout(() => setUploadStatus('idle'), 3000);

    } catch (error) {
      console.error('Upload error:', error);
      setUploadStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Erro ao fazer upload');
    } finally {
      setIsUploading(false);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h2 className={styles.title}>
          Foto do Perfil
        </h2>
        <p className={styles.subtitle}>
          Adicione ou altere sua foto de perfil
        </p>
      </div>

      {/* Avatar Display */}
      <div className={styles.avatarSection}>
        <div className={styles.avatarWrapper}>
          {/* Avatar Image */}
          {/* <div className={styles.avatarContainer}>
            {user.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={`Avatar de ${user.name}`}
                className={styles.avatarImage}
              />
            ) : (
              <div className={styles.placeholder}>
                <span>Sem Foto</span>
              </div>
            )}
          </div> */}

          {/* Upload Overlay */}
          <button
            onClick={triggerFileSelect}
            disabled={isUploading}
            className={styles.avatarOverlay}
          >
            {isUploading ? (
              <div className={styles.spinner}></div>
            ) : (
              <h1>Camera</h1>
            )}
          </button>
        </div>
      </div>

      {/* Upload Button */}
      <button
        onClick={triggerFileSelect}
        disabled={isUploading}
        className={`${styles.uploadButton} ${isUploading ? styles.uploading : ''}`}
      >
        {isUploading ? (
          <>
            <div className={styles.buttonSpinner}></div>
            Enviando...
          </>
        ) : (
          <>
            Escolher Nova Foto
          </>
        )}
      </button>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className={styles.hiddenInput}
      />

      {/* Status Messages */}
      {uploadStatus === 'success' && (
        <div className={styles.successMessage}>
          <span>Avatar atualizado com sucesso!</span>
        </div>
      )}

      {uploadStatus === 'error' && (
        <div className={styles.errorMessage}>
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Upload Guidelines */}
      <div className={styles.guidelines}>
        <p className={styles.guidelinesTitle}>Diretrizes:</p>
        <ul className={styles.guidelinesList}>
          <li>• Formatos suportados: JPG, PNG, WebP</li>
          <li>• Tamanho máximo: 5MB</li>
          <li>• Recomendado: imagens quadradas</li>
        </ul>
      </div>
    </div>
  );
}
