import { getCookie } from 'cookies-next'
import { verifica } from '../services/user'
import Link from 'next/link'


export default function Home() {
  return (
    <div>
      <h1>Bem Vindo!</h1>
      <Link href="/login">Sair</Link>
    </div>
  )
}

export const getServerSideProps = async ({req, res}) => {
  try {
    const token = getCookie('authorization', { req, res })
    if (!token) throw new Error('Token inválido')
    
    verifica(token)
    return {
      props: {}
    }
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: '/loginSelection'
      },
      props: {}
    }
  }
}