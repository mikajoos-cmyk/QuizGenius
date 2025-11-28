import React from 'react';

const MasonryGrid = ({ children }) => {
    return (
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 p-4">
            {React.Children.map(children, (child) => (
                <div className="break-inside-avoid mb-6">
                    {child}
                </div>
            ))}
        </div>
    );
};

export default MasonryGrid;
