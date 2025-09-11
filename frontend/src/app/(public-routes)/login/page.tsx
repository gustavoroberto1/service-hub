'use client'

import { InputCustom } from '@/components/InputCustom';
import { useState } from 'react';
import styles from './styles.module.css';

export default function Home() {
  const [email, setEmail] = useState<{ email: string, password: string}>();

  return (
    <div>
      <form className={styles.form}>
        <InputCustom type="text" placeholder='Digite o e-mail'/>
        <InputCustom type="password" placeholder='Digite a senha'/>
      </form>
    </div>
  );
}
