import { createContext, useReducer } from "react";
import { authReducer } from "../../reducer/AuthReducer";
import { postSignupData } from "../../utils/Auth/postSignupData";
import { postLoginData } from "../../utils/Auth/postLoginData";
import { useNavigate } from "react-router";
import { successToastMsg } from "../../components/ProductCard/ProductCard";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [authState, dispatchAuth] = useReducer(authReducer, {
    isLoggedin: false,
    userDetails: {},
  });

  const navigate = useNavigate();
  const signupUser = async (signupData) => {
    try {
      const { status, data } = await postSignupData(signupData);
      if (status === 201) {
        localStorage.setItem("userToken", data?.encodedToken);
        dispatchAuth({ type: "SET_LOGIN_TRUE", payload: true });
        dispatchAuth({ type: "SET_USER", payload: data?.createdUser });
        navigate("/products");
        successToastMsg("Signup Successfull");
      }
    } catch (error) {
      dispatchAuth({ type: "SET_LOGIN_FALSE", payload: false });
      console.error(error);
    }
  };

  const loginUser = async (loginData) => {
    try {
      const response = await postLoginData(loginData);
      if (response?.status === 200) {
        localStorage.setItem("userToken", response?.data?.encodedToken);
        navigate("/products");
        successToastMsg("Login Successfull");

        dispatchAuth({ type: "SET_LOGIN_TRUE", payload: true });
        dispatchAuth({
          type: "SET_USER",
          payload: response?.data?.foundUser,
        });
      }
    } catch (error) {
      dispatchAuth({ type: "SET_LOGIN_FALSE", payload: false });
      console.error(error);
    }
  };
  const value = { authState, dispatchAuth, signupUser, loginUser };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};