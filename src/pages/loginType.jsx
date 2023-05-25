import Button from "../components/Button";
import LoginCard from "../components/LoginCard";
import style from "../styles/basicPage.module.css"
import { useRouter } from "next/router";
import firebase from "firebase";
import { FaEnvelope, FaGoogle } from 'react-icons/fa';
import { auth } from "../lib/firebase";

export default function LoginSelectionPage() {
    const router = useRouter();

    
    const handleGoogleSignIn = () => {
        let provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider)
            .then((result) => {
                var credential = result.credential;
                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = credential.accessToken;
                // The signed-in user info.
                var user = result.user;
                // IdP data available in result.additionalUserInfo.profile.
                const isAuthenticated = true;
                document.cookie = `isAuthenticated=${isAuthenticated}`
                router.push('/');
            }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
         })
        }

    return (
        <div className={`${style.basicPage}`}>
            <LoginCard tittle="Por favor selecione o modo de login">
                <Button onClick={() => router.push('/login') } className={`w-[300px] h-[50px] flex justify-center items-center self-center border-0 rounded-lg bg-[#212A3E] p-2 text-lg text-white mt-5 mb-4`}>
                    <FaEnvelope className="mr-3" />E-mail
                </Button>
                <Button onClick={handleGoogleSignIn} className={`w-[300px] h-[50px] flex justify-center items-center self-center border-0 rounded-lg bg-[#9CA777] p-2 text-lg text-white mb-4`}>
                    <FaGoogle className="mr-3" />Google
                </Button>
            </LoginCard>
        </div>
    )
}