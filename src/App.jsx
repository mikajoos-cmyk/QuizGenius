import React from 'react';
import Flashcard from './components/Flashcard';
import MasonryGrid from './components/MasonryGrid';

function App() {
  const cards = [
    { id: 1, front: "What is the capital of France?", back: "Paris" },
    { id: 2, front: "What is 2 + 2?", back: "4" },
    { id: 3, front: "Who wrote Hamlet?", back: "William Shakespeare" },
    { id: 4, front: "What is the chemical symbol for Gold?", back: "Au" },
    { id: 5, front: "What is the largest planet in our solar system?", back: "Jupiter" },
    { id: 6, front: "What is the speed of light?", back: "299,792,458 m/s" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">QuizGenius Visual Test</h1>
      <MasonryGrid>
        {cards.map(card => (
          <Flashcard key={card.id} front={card.front} back={card.back} />
        ))}
      </MasonryGrid>
    </div>
  );
}

export default App;
