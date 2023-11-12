document.addEventListener('DOMContentLoaded', () => {
    const wordStatus = {
        'example': { word: 'example', mastered: false },
        'vocabulary': { word: 'vocabulary', mastered: false },
        'flash': { word: 'flash', mastered: false },
        // ... other words
    };

    let currentWordKey = Object.keys(wordStatus)[0];
    const flashCard = document.getElementById('flashCard');
    const wordDisplay = document.getElementById('word');
    const pronounceBtn = document.getElementById('pronounceBtn');
    const gotItBtn = document.getElementById('gotItBtn');
    const needsWorkBtn = document.getElementById('needsWorkBtn');

    const updateWordDisplay = () => {
        wordDisplay.textContent = wordStatus[currentWordKey].word;
        flashCard.style.backgroundColor = wordStatus[currentWordKey].mastered ? '#dff0d8' : '#f2dede';
    };

    flashCard.addEventListener('click', () => {
        currentWordKey = Object.keys(wordStatus)[Math.floor(Math.random() * Object.keys(wordStatus).length)];
        updateWordDisplay();
    });

    pronounceBtn.addEventListener('click', () => {
        const currentWord = wordDisplay.textContent;
        const utterance = new SpeechSynthesisUtterance(currentWord);
        speechSynthesis.speak(utterance);
    });

    gotItBtn.addEventListener('click', () => {
        wordStatus[currentWordKey].mastered = true;
        updateWordDisplay();
    });

    needsWorkBtn.addEventListener('click', () => {
        wordStatus[currentWordKey].mastered = false;
        updateWordDisplay();
    });

    updateWordDisplay(); // Initialize the display
});
