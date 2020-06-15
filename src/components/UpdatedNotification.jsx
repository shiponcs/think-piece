import React, { useRef, useEffect } from "react";
import { createPortal } from "react-dom";

const UpdateNotification = ({ children }) => {
  const elRef = useRef(null);
  if (!elRef.current) {
    const div = document.createElement("div");
    div.style.background = "green";
    elRef.current = div;
  }

  useEffect(() => {
    const updateNotificationRoot = document.getElementById(
      "update-notification"
    );
    updateNotificationRoot.appendChild(elRef.current);
    return () => updateNotificationRoot.removeChild(elRef.current);
  }, []);

  return createPortal(<div>{children}</div>, elRef.current);
};

export default UpdateNotification;
