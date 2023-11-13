document.addEventListener('DOMContentLoaded', () => {
    const words = {
        'example': { word: 'example', mastered: false },
        'vocabulary': { word: 'vocabulary', mastered: false },
        // ... other words
    };

    let currentWord = 'example';
    const flashCard = document.getElementById('flashCard');
    const wordDisplay = document.getElementById('word');
    const pronounceBtn = document.getElementById('pronounceBtn');
    const gotItBtn = document.getElementById('gotItBtn');
    const needsWorkBtn = document.getElementById('needsWorkBtn');
    const masteredList = document.getElementById('masteredList');

    const updateWordDisplay = () => {
        wordDisplay.textContent = words[currentWord].word;
        // Toggle visibility of 'got it' button based on mastered status
        gotItBtn.style.display = words[currentWord].mastered ? 'none' : 'inline';
    };

    const updateMasteredList = () => {
        masteredList.innerHTML = ''; // Clear the list before updating
        Object.keys(words).forEach((key) => {
            if (words[key].mastered) {
                const li = document.createElement('li');
                li.textContent = words[key].word;
                const pronounceButton = document.createElement('button');
                pronounceButton.textContent = '🔊';
                pronounceButton.onclick = () => {
                    const utterance = new SpeechSynthesisUtterance(words[key].word);
                    speechSynthesis.speak(utterance);
                };
                li.appendChild(pronounceButton);
                masteredList.appendChild(li);
            }
        });
    };

    flashCard.addEventListener('click', () => {
        const keys = Object.keys(words);
        currentWord = keys[Math.floor(Math.random() * keys.length)];
        updateWordDisplay();
    });

    pronounceBtn.addEventListener('click', () => {
        const utterance = new SpeechSynthesisUtterance(words[currentWord].word);
        speechSynthesis.speak(utterance);
    });

    gotItBtn.addEventListener('click', () => {
        words[currentWord].mastered = true;
        updateWordDisplay();
        updateMasteredList();
    });

    needsWorkBtn.addEventListener('click', () => {
        words[currentWord].mastered = false;
        updateWordDisplay();
        updateMasteredList();
    });

    updateWordDisplay(); // Initialize the display
    updateMasteredList(); // Initialize the mastered list
});
