import { useEffect,useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component"

import Nav from "../components/navbar";
import Carousel from "../components/Carousel/Carousel";
import Product from "../components/Product/Product";
import Filters from "../components/Filters/Filters";
import { getRestaurantsThunks, setLoading, useAppDispatch, useAppSelector } from "../redux";
import ProductSkelton from "../components/Skeleton/ProductSkeleton";


export default function Home() {
  const [{value:data,sort,total,loading},city] = useAppSelector(state=>[state.restaurant,state.city.value,])
  const dispatch =  useAppDispatch();
  const [ count,setCount] = useState(2)


  // prevent data fetch each time back to home
  useEffect(()=>{
    if (data.length===0 || localStorage.getItem("city") !== city || localStorage.getItem("sort") !== sort) {
      window.scroll({top: 0, left: 0, behavior: 'smooth' })
      dispatch(setLoading(true))
      dispatch(getRestaurantsThunks({city,sort:sort}));
      setCount(2)
      localStorage.setItem("city",city)
      localStorage.setItem("sort",sort)
    }
  },[city,sort,dispatch,data.length])
  function nextFn(){
    dispatch(getRestaurantsThunks({city:city,page:count,sort:sort}))
    setCount(prev=>prev+1);
  }
  
  return (
    <>
      <Nav/>
      <main className="body">
        <Carousel />
        <Filters/>
        {/* render 10 loading  Skelton if no data present*/}
        {<InfiniteScroll dataLength={data.length} className="productList" next={nextFn} hasMore={total-data.length>5} loader={<ProductSkelton/>}>
          {
            loading ?Array.from({length:10}).map((el,i)=><ProductSkelton key={i}/>)  : data?.map(obj=><Product key={obj._id} data={obj}/>)
          }
        </InfiniteScroll>}
      </main>
    </>
  );
}
