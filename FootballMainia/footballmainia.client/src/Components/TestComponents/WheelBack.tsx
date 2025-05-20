import React, { useState, useMemo, useEffect } from 'react';



const Wheel: React.FC = () => {
    const [segmentsCount, setSegmentsCount] = useState<number>(6);
    const [rotation, setRotation] = useState<number>(0);
    const [winner, setWinner] = useState<number | null>(null);
    const [segments, setSegments] = useState<string[]>([]);

    useEffect(() => {
        const colors = ["#000", "#fff", "#ccc"];
        const newSegments: string[] = [];

        for (let i = 0; i < segmentsCount; i++) {
            if ((i === segmentsCount - 1) && (newSegments[0] === colors[i % 3])) {
                newSegments.push(colors[i - colors.length + 1]);
                break;
            }
            newSegments.push(colors[i % colors.length]);

        }



        setSegments(newSegments);
    }, [segmentsCount]);

    const gradient = useMemo(() => {
        const step = 360 / segmentsCount;
        return segments
            .map((color, i) => `${color} ${i * step}deg ${i * step + step}deg`)
            .join(', ');
    }, [segments, segmentsCount]);

    const spin = () => {
        const spins = 5;
        const anglePerSegment = 360 / segmentsCount;
        const winningIndex = Math.floor(Math.random() * segmentsCount);
        const finalRotation =
            360 * spins + (360 - winningIndex * anglePerSegment - anglePerSegment / 2);
        setRotation(finalRotation);
        setTimeout(() => setWinner(winningIndex + 1), 3000);
    };

    return (
        <div className="container text-center mt-4">
            <h2 className="mb-4">Ko³o Fortuny</h2>
            <div className="position-relative mx-auto" style={{ width: 300, height: 300 }}>
                <div
                    className="rounded-circle border border-dark position-relative overflow-hidden"
                    style={{
                        width: '100%',
                        height: '100%',
                        background: `conic-gradient(${gradient})`,
                        transform: `rotate(${rotation}deg)`,
                        transition: 'transform 3s ease-out',
                    }}
                >
                    {segments.map((_, i) => {
                        const angle = (360 / segmentsCount) * i + (360 / segmentsCount) / 2;

                        return (
                            <div
                                key={i}
                                style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: `rotate(${angle}deg) translate(0, -100px) rotate(-${angle}deg)`,
                                    transformOrigin: 'center',
                                    pointerEvents: 'none',
                                }}
                            >
                                <div
                                    style={{
                                        textAlign: 'center',
                                        fontSize: '0.8rem',
                                        fontWeight: 'bold',
                                        whiteSpace: 'nowrap',
                                        backgroundColor: 'rgba(255,255,255,0.7)',
                                        borderRadius: '4px',
                                        padding: '2px 4px',
                                    }}
                                >
                                    Pole {i + 1}
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div
                    className="position-absolute top-50 start-50 translate-middle text-danger"
                    style={{ fontSize: '2rem', zIndex: 10 }}
                >
                    ??
                </div>
            </div>

            <button className="btn btn-primary mt-4" onClick={spin}>
                Zakrêæ!
            </button>

            <div className="form-group d-flex justify-content-center align-items-center gap-2 mt-3">
                <label htmlFor="segmentCount" className="me-2 mb-0">
                    Iloœæ pól:
                </label>
                <input
                    id="segmentCount"
                    type="number"
                    min={2}
                    max={20}
                    value={segmentsCount}
                    onChange={(e) => setSegmentsCount(Number(e.target.value))}
                    className="form-control w-auto"
                />
            </div>

            {winner && <div className="alert alert-success mt-3">Wygrywa: #{winner}</div>}
        </div>
    );
};

export default Wheel;
