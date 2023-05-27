import { serialize } from "cookie";

export function removeCookie(cookieName) {
    const cookieValue= '';
    const cookieOptions = {
        maxAge: -1,
        path: '/',
    };

    const cookie = serialize(cookieName, cookieValue, cookieOptions);

    document.cookie = cookie;

    if(typeof window === 'undefined') {
        const ctx = {};
        ctx.res.setHeader('Set-Cookie', cookie)
    }
}