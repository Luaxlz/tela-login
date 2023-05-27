import { useRouter } from "next/router"
import { removeCookie } from "../util/removeCookie";

const LogoutButton = ({className, children, ...props}) => {
    const router = useRouter();

    const handleLogout = async () => {
        await removeCookie('isAuthenticated');
        router.push('/login');
    };

    return (
        <button className={className} onClick={handleLogout}>{children}</button>
    )
}

export default LogoutButton