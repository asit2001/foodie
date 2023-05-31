
import { City } from "./type";

const  data =  [
  {
    img: "https://firebasestorage.googleapis.com/v0/b/quora-clone-asit.appspot.com/o/public%2Fpizza.webp?alt=media",
    name: "Pizza",
  },
  {
    img: "https://firebasestorage.googleapis.com/v0/b/quora-clone-asit.appspot.com/o/public%2Fchicken.webp?alt=media",
    name: "Chicken",
  },
  {
    img: "https://firebasestorage.googleapis.com/v0/b/quora-clone-asit.appspot.com/o/public%2Fburgers.webp?alt=media",
    name: "Burgers",
  },
  {
    img: "https://firebasestorage.googleapis.com/v0/b/quora-clone-asit.appspot.com/o/public%2Fchinese.webp?alt=media",
    name: "Chinese",
  },
  {
    img: "https://firebasestorage.googleapis.com/v0/b/quora-clone-asit.appspot.com/o/public%2Fthai.webp?alt=media",
    name: "Thai",
  },
  {
    img: "https://firebasestorage.googleapis.com/v0/b/quora-clone-asit.appspot.com/o/public%2Fcurry.webp?alt=media",
    name: "Indian",
  },
  {
    img: "https://firebasestorage.googleapis.com/v0/b/quora-clone-asit.appspot.com/o/public%2Fpasta.webp?alt=media",
    name: "Italian",
  },
  {
    img: "https://firebasestorage.googleapis.com/v0/b/quora-clone-asit.appspot.com/o/public%2Fdessert.webp?alt=media",
    name: "Dessert",
  },
  {
    img: "https://firebasestorage.googleapis.com/v0/b/quora-clone-asit.appspot.com/o/public%2Forganic.webp?alt=media",
    name: "Healthy",
  },
  {
    img: "https://firebasestorage.googleapis.com/v0/b/quora-clone-asit.appspot.com/o/public%2Facai.png?alt=media",
    name: "Breakfast",
  },
  {
    img: "https://firebasestorage.googleapis.com/v0/b/quora-clone-asit.appspot.com/o/public%2Fvegan.webp?alt=media",
    name: "Vegan",
  },
];
export default data
export const cityList:{name:City,state:string}[] =[
  {
    name:"Bangalore",
    state:"Karnataka, India"
  },
  {
    name:"Chennai",
    state:"Tamil Nadu, India"
  },
  {
    name:"Cuttack",
    state:"Odisa, India"
  },
  {
    name:"Delhi",
    state:"Delhi, India"
  },
  {
    name:"Hyderabad",
    state:"Telangana, India"
  },
  {
    name:"Kolkata",
    state:"West Bengal, India"
  },
  {
    name:"Mumbai",
    state:"Maharashtra, India"
  },
  {
    name:"Noida",
    state:"Uttar Pradesh, India"
  },
] 
export const Offers = [
  {
    _id: "89c1a8ee-1965-48f5-92a5-6a8f6df5a3c5",
    icon: "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_28,h_28/Store_Assets/Icons/OfferIconCart",
    title: "FLAT ₹100 OFF",
    subTitle: "USE ASIT2023 | ABOVE ₹749",
  },
  {
    _id: "2d5fc5ce-8d0a-4f3b-b3f9-b9d9cc45f347",
    icon: "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_28,h_28/rng/md/ads/production/1acdb97aadcb61b323307845bda86535",
    title: "20% OFF UPTO ₹120",
    subTitle: "USE FEDERALCC | ABOVE ₹249",
  },
  {
    _id: "dc1251bf-8b0f-4e90-a47f-92569fc019a9",
    icon: "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_28,h_28/rng/md/ads/production/6ef0fc65ca643ecbdcf8a930599c7edd",
    title: "15% OFF UPTO ₹100",
    subTitle: "USE HSBCFEST | ABOVE ₹499",
  },
]
 
export const cardList:{[key:string]:string|undefined} = {
  Visa: "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,e_trim/Visa_lztyeu",
  Mastercard :"https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,e_trim/Mastercard_wqoea2",
  Amex:"https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,e_trim/Amex_ozga1w",
  Zeta:"https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,e_trim/Zeta_zybqrc",
  RuPay:"https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,e_trim/RuPayColoured_oyd73s_soebkd",

}