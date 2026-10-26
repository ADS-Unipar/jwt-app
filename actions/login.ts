'use server';

import publicApi from '@/lib/api';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';


export async function login( _prevState: {error:null|string}, formData: FormData) {
  const email = formData.get('email');
  const password = formData.get('password');
  console.log('login action', email, password);
    try {
    const res = await publicApi.post(`/auth/login`, {
        email,
        password
    });
    
    const token = res.data.token;

    const cookieStore = await cookies();          // ← await no Next 15/16
    cookieStore.set('token', token, {
        httpOnly: true,                             // ← JS não lê o token
        secure: true,
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 15,                            // ← 15 minutos (exp curto)
    });

  
    }catch (error: any) {
        console.error('Login error:', error);
        return {
            error: error.response?.data?.message || 'Erro ao fazer login',
        };
    }

      redirect('/dashboard');
}