import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Button from "../components/Button";
import LoginCard from "../components/LoginCard";
import { auth } from "../lib/firebase";
import { useState } from 'react';

export async function getServerSideProps(context) {
  // Obter o valor do cookie que contém a informação de autenticação
  const cookies = context.req.headers.cookie || '';
  const isAuthenticatedCookie = cookies
    .split(';')
    .find((cookie) => cookie.trim().startsWith('isAuthenticated='));

  // Verificar se o usuário está autenticado
  const isAuthenticated = isAuthenticatedCookie
    ? isAuthenticatedCookie.split('=')[1] === 'true'
    : false;

  if (!isAuthenticated) {
    // Redirecionar para a página de login ou exibir uma mensagem de erro
    return {
      redirect: {
        destination: '/loginType',
        permanent: false,
      },
    };
  }

  // Retornar outros dados necessários para a página
  return {
    props: {
      // Outros dados necessários para a página
    },
  };
}


export default function Home() {
  // A DOM só será renderizada se o usuário estiver autenticado
  // Você pode acessar o objeto `user` retornado por `getServerSideProps` aqui

  const router = useRouter()
  const [userDisplayName, setUserDisplayName] = useState('');

  useEffect(() => {
    const fetchUserDisplayName = async () => {
      const user = auth.currentUser;
      if (user) {
        await user.reload(); // Atualiza as informações do usuário
        setUserDisplayName(user.displayName || 'Usuário');
      }
    };

    fetchUserDisplayName();
  }, []);

  function handleLogout(event) {
    auth.signOut()
      .then(() => {
        router.push('/login');
      })
      .catch((error) => {
        console.log('Erro ao efetuar logout:', error.message);
      });
  }
  
  return (
    <div className="flex justify-center items-center h-screen">
      <LoginCard>
        <div>
          {userDisplayName ? (
            <h1 className="text-center text-[46px]">Bem Vindo(a), {userDisplayName}!</h1>
          ) : (
            <h1 className="text-center text-[56px]"> </h1>
        )}
        </div>
        <div className="flex justify-around">
          <Button 
          className={`w-[200px] bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 focus:outline-none focus:bg-red-700`}
          onClick={handleLogout}>
            Sair
          </Button>
        </div> 
      </LoginCard>
    </div>
  );
};