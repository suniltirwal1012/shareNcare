import React from "react";
import { FaWhatsapp, FaInstagram, FaTelegram, FaCopy } from "react-icons/fa";

export default function ShareOptions() {
    const url = "https://example.com"; // Static URL

    const shareOnWhatsApp = () => {
        window.open(`https:/https://mern-fullstack-72ou.onrender.com/api.whatsapp.com/send?text=${encodeURIComponent(url)}`);
    };

    const shareOnInstagram = () => {
        window.open(`https://www.instagram.com/?url=${encodeURIComponent(url)}`);
    };

    const shareOnTelegram = () => {
        window.open(`https://telegram.me/share/url?url=${encodeURIComponent(url)}`);
    };

    const copyLink = () => {
        navigator.clipboard.writeText(url).then(() => {
            alert("Link copied to clipboard!");
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    };

    const shareWithWebAPI = () => {
        if (navigator.share) {
            navigator.share({
                title: document.title,
                url: url
            }).then(() => {
                console.log('Successfully shared.');
            }).catch((error) => {
                console.error('Error sharing:', error);
            });
        }
    };

    return (
        <>
        <div className="share-options flex items-center justify-center gap-4 h-[80vh]">
            <button className="share-button whatsapp p-2 rounded-full bg-green-500 hover:bg-green-600 text-white" onClick={shareOnWhatsApp}><FaWhatsapp size={48} /></button>
            <button className="share-button instagram p-2 rounded-full bg-purple-500 hover:bg-purple-600 text-white" onClick={shareOnInstagram}><FaInstagram size={48} /></button>
            <button className="share-button telegram p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white" onClick={shareOnTelegram}><FaTelegram size={48} /></button>
            <button className="share-button copy p-2 rounded-full bg-gray-500 hover:bg-gray-600 text-white" onClick={copyLink}><FaCopy size={48} /></button>
            {navigator.share && <button className="share-button webapi p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white" onClick={shareWithWebAPI}>Share with Web API</button>}
        </div>
        </>
    );
}
