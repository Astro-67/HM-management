import { useEffect, useRef } from "react";

export function useOutsideClick(handler,listenCapturing = true) {
     const modalRef = useRef();
    
      useEffect(() => {
        function handleClickOutside(e) {
          if (modalRef.current && !modalRef.current.contains(e.target)) {
            handler();
          }
        }
    
        document.addEventListener("mousedown", handleClickOutside, listenCapturing);
        
        return () => {
          document.removeEventListener("mousedown", handleClickOutside, listenCapturing);
        };
      }, [handler,listenCapturing]);

        return modalRef;
}
