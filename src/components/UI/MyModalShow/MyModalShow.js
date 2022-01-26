import React from "react";
import cl from "./MyModalShow.module.css";

const MyModalShow = ({ children, visible, setVisible }) => {
  const rootClasses = [cl.myModalShow];

  if (visible) {
    rootClasses.push(cl.active);
  }

  return (
    <div className={rootClasses.join(" ")} onClick={() => setVisible(false)}>
      <div
        className={cl.myModalContentShow}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default MyModalShow;
