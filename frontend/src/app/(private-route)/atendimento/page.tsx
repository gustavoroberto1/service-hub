'use client'

import { useRouter } from 'next/navigation';
import styles from './styles.module.css';

export default function Tickets() {
    const router = useRouter();
   
    function handleRedirect(id: string) {
        router.push(`/atendimento/${id}`)
    }

    const atendimentos = [
        {
            id: 'd8f70a80-d146-40a6-9fb4-45a01db6771d',
            titulo: "Problema ao fazer login",
            description: "Blababla balbalba blablabab"
        },
        {
            id: "cd2e651d-7006-48fd-baf0-ff0ab2921186",
            titulo: "Problema Dashboard",
            description: "Blababla balbalba blablabab"
        },
        {
            id: "dff33da9-b9be-4a00-a186-7e983217336d",
            titulo: "Problema Clientes",
            description: "Blababla balbalba blablabab"
        },
        {
            id: "3ed45b71-d011-4588-ac04-5d962696d873",
            titulo: "Problema Chamados",
            description: "Blababla balbalba blablabab"
        },
    ]

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.list}>


                    {atendimentos.map(att => (
                        <div className={styles.item} key={att.id} onClick={() => handleRedirect(att.id)}>
                            <span>{att.titulo}</span>
                            <p>{att.description}</p>
                        </div>
                    ))}



                </div>
            </div>
        </div>
    )
}