import React, { useEffect, useState } from "react";
import { IoIosArrowUp } from "react-icons/io";
import "./ScrollToTop.css";
const ScrollToTop = () => {
  const [scrolling, setScrolling] = useState(null);
  const [active, setActive] = useState(false);
  const onScroll = () => {
    let posNow = document.documentElement.scrollTop;
    let height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = (posNow * 100) / height;
    const scrollValue = Math.round(scrolled);
    if (window.scrollY > 500) {
      setActive(true);
    } else {
      setActive(false);
    }
    setScrolling(scrollValue);
  };
  useEffect(() => {
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  });
  const handleBacktoTop = () => {
    document.documentElement.scrollTop = 0;
  };

  return (
    <>
      <div
        className={active ? "scrollprogress progress-active" : "scrollprogress"}
        style={{
          background: `conic-gradient(#f20761 ${scrolling}% ,transparent ${scrolling}%)`,
        }}
        onClick={handleBacktoTop}
      >
        <div className="progressvalue">
          <IoIosArrowUp />
        </div>
      </div>
    </>
  );
};

export default ScrollToTop;
