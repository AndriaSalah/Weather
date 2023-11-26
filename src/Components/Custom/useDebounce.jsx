import { useEffect, useRef } from 'react';

const useDebounce = (callback, delay) => {
    const timeoutRef = useRef(null);

    useEffect(() => {
        return () => clearTimeout(timeoutRef.current);
    });

    return  (...args) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            callback(...args);
        }, delay);
    };

};
export default useDebounce