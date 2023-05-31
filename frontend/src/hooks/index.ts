import { useState, useEffect } from "react";
import { orderThunk, useAppDispatch } from "../redux";
import { useNavigate } from "react-router-dom";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}
export function useOrder() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return function (cart_id: string) {
    dispatch(orderThunk({ cart_id, method: "POST" })).then(({ meta }) => {
      if (meta.requestStatus === "fulfilled") {
        navigate("/my-account");
      }
    });
  };
}
