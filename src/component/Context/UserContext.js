import React, { createContext, useState, useEffect } from "react";
import app from "../firebase/firebase.config";
import { toast } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { addToDatabaseCart } from "../database/databaseManager";
import { useNavigate } from "react-router-dom";

const auth = getAuth(app);
export const AuthContext = createContext();

const UserContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setloading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const createUser = (email, password) => {
    setloading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const signIn = (email, password) => {
    setloading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const logOut = () => {
    setloading(true);
    toast("LogOut Sucessfull");
    setUser(null);
    return signOut(auth);
  };
  const updateName = (name) => {
    updateProfile(auth.currentUser, {
      displayName: name,
    });
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setloading(false);
      return unsubscribe();
    });
  }, []);

  const getLocalacrtData = () => {
    const locarData = localStorage.getItem("productShop");
    if (locarData) {
      return JSON.parse(locarData);
    } else {
      return [];
    }
  };
  const [cartProduct, setCartProduct] = useState(getLocalacrtData);
  const handleAddToCart = (product) => {
    const productId = product.id;
    const sameProduct = cartProduct.find((pd) => pd.id === productId);
    let count = Number(quantity);
    let newCart;

    if (sameProduct) {
      count = Number(sameProduct.quantity) + Number(count);
      sameProduct.quantity = count;
      const others = cartProduct.filter((pd) => pd.id !== productId);
      newCart = [...others, sameProduct];
    } else {
      product.quantity = quantity;
      newCart = [...cartProduct, product];
    }
    toast(`${product.name} added Succesfully`);
    setCartProduct(newCart);
    addToDatabaseCart(newCart);
    navigate("/cart", { replace: true });
  };

  const authInfo = {
    user,
    createUser,
    signIn,
    updateName,
    setUser,
    logOut,
    loading,
    handleAddToCart,
    quantity,
    setQuantity,
    getLocalacrtData,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default UserContext;
