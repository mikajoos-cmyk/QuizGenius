import React, { useState } from 'react';

const Flashcard = ({ front, back }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleClick = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div
            className="perspective-1000 w-full h-64 cursor-pointer group"
            onClick={handleClick}
        >
            <div
                className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}
            >
                {/* Front Face */}
                <div className="absolute w-full h-full backface-hidden bg-white rounded-xl shadow-lg p-6 flex items-center justify-center text-center border border-gray-100">
                    <div className="text-xl font-medium text-gray-800">
                        {front}
                    </div>
                </div>

                {/* Back Face */}
                <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-indigo-50 rounded-xl shadow-lg p-6 flex items-center justify-center text-center border border-indigo-100">
                    <div className="text-xl font-medium text-indigo-900">
                        {back}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Flashcard;
