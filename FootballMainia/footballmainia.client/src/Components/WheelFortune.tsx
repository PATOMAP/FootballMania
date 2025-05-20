
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

    function randomColor(): { r: number; g: number; b: number } {
        const r = Math.floor(Math.random() * 255);
        const g = Math.floor(Math.random() * 255);
        const b = Math.floor(Math.random() * 255);
        return { r, g, b };
    }

    function toRad(deg: number): number {
        return deg * (Math.PI / 180.0);
    }

    function drawWheel(items: string[]) {
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

        // Tło (opcjonalne)
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, toRad(0), toRad(360));
        ctx.fillStyle = 'rgb(50,50,50)';
        ctx.lineTo(centerX, centerY);
        ctx.fill();

        // Segmenty
        let startDeg = 0;
        for (let i = 0; i < items.length; i++) {
            const endDeg = startDeg + step;
            const color = colors[i];
            const colorStyle = `rgb(${color.r},${color.g},${color.b})`;

            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, toRad(startDeg), toRad(endDeg));
            ctx.fillStyle = colorStyle;
            ctx.fill();

            // Tekst (opcjonalnie)
            const midDeg = (startDeg + endDeg) / 2;
            const angle = toRad(midDeg);
            const textX = centerX + Math.cos(angle) * (radius * 0.6);
            const textY = centerY + Math.sin(angle) * (radius * 0.6);
            ctx.fillStyle = '#000';
            ctx.font = '16px sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(items[i], textX, textY);

            startDeg += step;
        }
    }

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
        </div>
    );
};

export default Wheel;
