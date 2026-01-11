import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        if (hash) {
            // Add a small delay to ensure content is rendered
            setTimeout(() => {
                const element = document.getElementById(hash.replace('#', ''));
                if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                }
            }, 100);
        } else {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        }
    }, [pathname, hash]);

    return null;
};

export default ScrollToTop;
