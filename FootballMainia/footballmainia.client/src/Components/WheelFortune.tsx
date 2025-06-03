import '../styleCss/WheelStyle.css';
import { motion } from 'framer-motion';
import { useState } from 'react';

function WheelFortune() {
    const [isSpinning, setIsSpinning] = useState(false);
    const [rotation, setRotation] = useState(0);

    const spinWheel = () => {
        if (isSpinning) return; // zapobiegaj wielokrotnemu kliknięciu

        const randomTurns = Math.floor(Math.random() * 5) + 3; // losowe 3-7 obrotów
        const degrees = randomTurns * 360 + Math.floor(Math.random() * 360); // losowy punkt zatrzymania

        setRotation(prev => prev + degrees);
        setIsSpinning(true);

        setTimeout(() => {
            setIsSpinning(false);
        }, 4000); // zatrzymuje się po 4 sekundach
    };

    return (
        <div className="contianerO">
            <div className="arrow">&#9650;</div>

            <motion.div
                className="wheel"
                animate={{ rotate: rotation }}
                transition={{ duration: 4, ease: "easeOut" }}
            >
                {[...Array(8)].map((_, i) => (
                    <div
                        key={i}
                        className="segment"
                        style={{ transform: `rotate(${i * 45}deg)` }}
                    />
                ))}
            </motion.div>

            <button onClick={spinWheel} disabled={isSpinning} className="spin-button">
                {isSpinning ? 'Kręci się...' : 'Zakreć'}
            </button>
        </div>
    );
}

export default WheelFortune;
