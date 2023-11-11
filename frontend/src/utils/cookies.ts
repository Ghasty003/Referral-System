import cookie from "lazycookie";


export function setCookie(token: string) {

    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 7);

    cookie.setItem("access-token", token, {
        expires: expiryDate
    })
}


export function getCookie(key: string) {
    return cookie.getItem(key);
}