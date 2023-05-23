import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Button from "../components/Button";
import LoginCard from "../components/LoginCard";
import { auth } from "../lib/firebase";


export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push('/login'); // Redireciona para a página de login caso o usuário não esteja autenticado
      }
    });
  
    return () => unsubscribe(); // Cancela a inscrição do listener ao desmontar o componente
  }, []);
  

  function handleLogout(event) {
    auth.signOut()
      .then(() => {
        Router.push('/login');
      })
      .catch((error) => {
        console.log('Erro ao efetuar logout:', error.message);
      });
  }
  
  return (
    <div className="flex justify-center items-center h-screen">
      <LoginCard>
        <h1 className="text-center text-[56px]">Bem Vindo!</h1>
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