// src/ProgressLoader.js
import React, { useState, useEffect } from 'react';
import { fetchData } from '../utils/data';

const Loader = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const loadData = async () => {
            try {
                // Simulate data fetching with a timeout for demonstration
                // Replace this with your actual Kaggle API fetching logic
                for (let i = 0; i <= 100; i++) {
                    setTimeout(() => setProgress(i), i * 50);
                }
                const data = await fetchData();
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };
        loadData();
    }, []);

    const radius = 50;
    const stroke = 8;
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="flex items-center text-4xl font-bold">
                <span className="text-gray-400">Cassie</span>
                <span className="text-black">.</span>
                <span className="text-yellow-600">AI</span>

            </div>
            <svg
                height={radius * 2}
                width={radius * 2}
                className="mt-4 transform rotate-[-90deg]"
            >
                <circle
                    stroke="#e5e7eb"
                    fill="transparent"
                    strokeWidth={stroke}
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                />
                <circle
                    stroke="#3b82f6"
                    fill="transparent"
                    strokeWidth={stroke}
                    strokeDasharray={circumference + ' ' + circumference}
                    style={{ strokeDashoffset }}
                    strokeLinecap="round"
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                />
            </svg>
            <div className="mt-2 text-xl">{progress}%</div>
        </div>
    );
};

export default Loader;
