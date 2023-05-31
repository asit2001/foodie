import axios from "axios";
import jwt_decode from "jwt-decode";
import { cartResponse, decodeJWT } from "../type";
export {getAddress,initMap} from "./map"
interface RegisterUserProps{
    email:string;
    password:string;
    name:string
}

export type searchParams = {key:string,val:any}[]

function generateURL(pathname:string,query?:searchParams){
    const url = new URL(process.env.REACT_APP_API_URL!);
    url.pathname = pathname
    if (query) {
        for(const q  of query){
            if (typeof q==='object') {
                url.searchParams.set(q.key,q.val);
            }else{
                url.searchParams.set(q,q);
            }
        }
    }
    return url.href
}
export {generateURL}


export async function registerUser(data:RegisterUserProps){
    try{
        let url = generateURL("/api/user/signup")
        const res = await axios.post(url,data)
        return res.data
    }catch (e:any){
        throw new Error(e.response.data.error)

    }
}
export function sanitizeCartData(data:cartResponse){
    // const {_id,user_id} = data;
    // const {_id:restaurant_id,img} = data.restaurant_id
    const menus = [];
    for(let key in data.menus){
        menus.push({
          quantity:data.menus[key].quantity,
          menu_id : key,
          menu : data.menus[key].menu_id
        })
    }
  }

export function GetCardType(cardNumber:string)
{
    // visa
    var re = new RegExp("^4");
    if (cardNumber.match(re) != null)
        return "Visa";

    // Mastercard 
     if (/^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(cardNumber)) 
        return "Mastercard";

    // AMEX
    re = new RegExp("^3[47]");
    if (cardNumber.match(re) != null)
        return "Amex";
    //RuPay
    re = new RegExp("^6[01245].*")
    if (re.test(cardNumber))
        return "RuPay";
    // todo: add Zeta validation regex
    return ""
}
export function extractTokenFromCookie(cookieName:string) {
    const cookies = document.cookie.split(';');
    
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      
      if (cookie.startsWith(cookieName + '=')) {
        const token = cookie.substring(cookieName.length + 1);
        return token;
      }
    }
    
    return null; // Token not found
  }

export function decodeTokenFromCookie(tokenName:string){
    try {
        const token = extractTokenFromCookie(tokenName);
    if (token) {
        return jwt_decode(token) as decodeJWT
    }
    return null
    } catch (error) {
        return null;
    }
}
