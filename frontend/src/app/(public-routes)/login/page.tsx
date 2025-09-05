import { InputCustom } from '@/components/InputCustom';
import styles from './styles.module.css'
import { useState } from 'react';

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
