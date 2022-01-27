import React from "react";
import cl from "./ModalEdit.module.css";

const ModalEdit = ({ children, visible, setVisible }) => {
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

export default ModalEdit;
