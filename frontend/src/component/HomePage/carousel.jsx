import React, { useState, useEffect } from "react";

const images = [
    "/homeImage.jpeg",
    "/donation7.jpg",
    "https://img.freepik.com/premium-photo/welcome-team-shot-two-young-restaurant-owners-standing-outside-together-shaking-hands_590464-53704.jpg",
    "/Share & Care LOGO.png",
    "https://media.istockphoto.com/id/619643870/photo/hungry-african-children-asking-for-food-africa.jpg?s=1024x1024&w=is&k=20&c=9-fxG0x5A1-tMM8fYzcqCk6-ZTuLKlndFAIo4S09BnQ=",
    "https://images.unsplash.com/photo-1461354464878-ad92f492a5a0?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
];

function Carousel() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 2000); // Change image every 2 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full md:h-[60vh] h-[40vh] relative flex justify-center">
            {images.map((image, index) => (
                <img
                    key={index}
                    src={image}
                    alt={`Carousel ${index}`}
                    className={`absolute w-[97vw] h-[40vh] md:h-[65vh] rounded-2xl transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                    style={{ transition: "opacity 1s ease-in-out" }}
                />
            ))}
        </div>
    );
}

export default Carousel;
