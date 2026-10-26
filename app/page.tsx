'use client';

import { login } from '@/actions/login';
import { useActionState } from 'react';

export default function LoginPage() {

  const [state, formAction, isPending] = useActionState(login, {
    error: null,
  })

  const {  error } = state
  
  return (
    <main style={{ maxWidth: 380, margin: '80px auto' }}>
      <h1>Entrar na plataforma</h1>

      <form action={formAction}>
        <label htmlFor="email">E-mail</label>
        <input id="email" name="email" type="email" required />

        <label htmlFor="password">Senha</label>
        <input id="password" name="password" type="password" required />

        <button disabled={isPending} type="submit">Entrar</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </main>
  );
}