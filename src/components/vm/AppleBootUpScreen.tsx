"use client";

import React, { useEffect } from "react";
import { MotionDiv } from "../shared";

export const AppleBootUpScreen = () => {
    useEffect(() => {
        setTimeout(() => {
            const bootUpWindow = document.getElementById("boot");
            bootUpWindow!.classList.remove("opacity-100");
            bootUpWindow!.classList.add("opacity-0");
        }, 3350);
        
    }, []);

    const animations = {
        initial: { width: "0px" },
        animate: { width: "150px" },
    };

    return (
        <div
            id="boot"
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black opacity-100 transition-opacity duration-1000"
        >
            <img
                alt="Logo"
                className="h-28 w-26 select-none mt-2.5 mr-3"
                src={"/assets/images/logo/applelogo.png"}
            />
            <div className="mt-9 relative">
                <div className="w-[150px] h-1 rounded-full bg-gray-600" />
                <MotionDiv
                    className="absolute top-0 h-1 rounded-full bg-white"
                    variants={animations}
                    initial="initial"
                    animate="animate"
                    transition={{ ease: "easeInOut", duration: 2.1, delay: 0.4 }}
                />
            </div>
        </div>)


}