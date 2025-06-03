
import React, { useEffect, useRef, useState } from 'react';
import '../styleCss/WheelStyle.css';

const Wheel: React.FC = () => {
    const [text, setText] = useState(`cat
dog
cow
duck
sheep
goat
bird
neko
chicken`);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const pauseRef = useRef(false);
    const currentDegRef = useRef(0);
    const speedRef = useRef(0);
    const maxRotationRef = useRef(randomRange(360 * 3, 360 * 6));
    function randomColor(): { r: number; g: number; b: number } {
        const r = Math.floor(Math.random() * 255);
        const g = Math.floor(Math.random() * 255);
        const b = Math.floor(Math.random() * 255);
        return { r, g, b };
    }

    function toRad(deg: number): number {
        return deg * (Math.PI / 180.0);
    }
    function randomRange(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    function drawWheel(items: string[], rotationDeg: number = 0) {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const width = canvas.width;
        const height = canvas.height;
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = width / 2;

        const step = 360 / items.length;
        const colors = items.map(() => randomColor());

        ctx.clearRect(0, 0, width, height);
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(toRad(rotationDeg));
        ctx.translate(-centerX, -centerY);

        let startDeg = 0;
        for (let i = 0; i < items.length; i++, startDeg += step) {
            const endDeg = startDeg + step;
            const color = colors[i];
            const colorStyle = `rgb(${color.r},${color.g},${color.b})`;
            // W³aœciwy segment
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius - 30, toRad(startDeg), toRad(endDeg));
            ctx.fillStyle = colorStyle;
            ctx.lineTo(centerX, centerY);
            ctx.fill();

            // Tekst
            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.rotate(toRad((startDeg + endDeg) / 2));
            ctx.textAlign = "center";
            ctx.fillStyle = (color.r > 150 || color.g > 150 || color.b > 150) ? "#000" : "#fff";
            ctx.font = "bold 24px serif";
            ctx.fillText(items[i], 130, 10);
            ctx.restore();
        }

        ctx.restore();
    }

    // Funkcje pomocnicze
    function getPercent(value: number, max: number, min: number): number {
        return (value - min) / (max - min);
    }

    function easeOutSine(x: number): number {
        return Math.sin((x * Math.PI) / 2);
    }

    function animate(items: string[]) {
        if (pauseRef.current) return;

        const percent = getPercent(currentDegRef.current, maxRotationRef.current, 0);
        speedRef.current = easeOutSine(percent) * 20;

        if (speedRef.current < 0.01) {
            speedRef.current = 0;
            pauseRef.current = true;
            return;
        }

        currentDegRef.current += speedRef.current;

        drawWheel(items, currentDegRef.current); // <- przekazanie rotacji
        requestAnimationFrame(() => animate(items));
    }
    const handleSpin = () => {
        const items = text.split("\n").map(i => i.trim()).filter(Boolean);
        pauseRef.current = false;
        currentDegRef.current = 0;
        speedRef.current = 0;
        maxRotationRef.current = randomRange(360 * 3, 360 * 6);

        animate(items);
    };

    useEffect(() => {
        const items = text.split('\n').map(item => item.trim()).filter(Boolean);
        if (items.length > 0) drawWheel(items);
    }, [text]);

    return (
        <div>
            <div className="d-flex justify-content-center position-relative">
                <canvas ref={canvasRef} width={500} height={500}></canvas>
                <div className="center-circle">
                    <div className="triangle"></div>
                </div>
            </div>
            <div className="inputArea">
                <textarea
                    className="form-control mt-3"
                    rows={20}
                    cols={30}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
            </div>
            <button className="btn btn-success mt-3" onClick={() => handleSpin()}>
                Zakrêæ
            </button>
        </div>
    );
};

export default Wheel;
