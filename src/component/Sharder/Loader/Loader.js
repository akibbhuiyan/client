import React from "react";
import { Circles } from "react-loader-spinner";
const Loader = () => {
  const loader = {
    position: "fixed",
    top: "0",
    height: "100vh",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: "100",
    backgroundColor: "#f1f1f1d6",
  };
  return (
    <div style={loader}>
      <Circles
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default Loader;
