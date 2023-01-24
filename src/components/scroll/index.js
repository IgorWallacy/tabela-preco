import React, { useEffect, useRef } from "react";

function Scroll({ delayBottom, delayTop }) {
    const intervalRef = useRef(null);

    useEffect(() => {
        const scrollToBottom = () => {
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: "smooth"
            });
        };

        const scrollToTop = () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        };

        scrollToBottom();

        intervalRef.current = setInterval(() => {
            scrollToTop();
            setTimeout(() => scrollToBottom(), delayTop);
        }, delayBottom);

        return () => clearInterval(intervalRef.current);
    }, []);

    return null;
}

export default Scroll;
