document.addEventListener('DOMContentLoaded', () => {
    let words = {
        'example': { word: 'example', mastered: false },
        'vocabulary': { word: 'vocabulary', mastered: false },
        // ... other words
    };
    let masteredWords = {};

    const flashCard = document.getElementById('flashCard');
    const wordDisplay = document.getElementById('word');
    const pronounceBtn = document.getElementById('pronounceBtn');
    const gotItBtn = document.getElementById('gotItBtn');
    const needsWorkBtn = document.getElementById('needsWorkBtn');
    const masteredList = document.getElementById('masteredList');

    const getRandomWord = () => {
        const activeWords = Object.keys(words);
        if (activeWords.length === 0) {
            return 'Well done! All words mastered!';
        }
        const randomIndex = Math.floor(Math.random() * activeWords.length);
        return words[activeWords[randomIndex]].word;
    };

    const updateWordDisplay = (word) => {
        wordDisplay.textContent = word;
        // Hide 'got it' button if all words are mastered
        gotItBtn.style.display = (word in masteredWords) ? 'none' : 'inline-block';
    };

    const updateMasteredList = () => {
        masteredList.innerHTML = ''; // Clear the list before updating
        Object.keys(masteredWords).forEach((key) => {
            const li = document.createElement('li');
            li.textContent = masteredWords[key].word;
            li.classList.add('mastered-word'); // Add class to li element
            const pronounceButton = document.createElement('button');
            pronounceButton.textContent = '🔊';
            pronounceButton.onclick = () => {
                const utterance = new SpeechSynthesisUtterance(masteredWords[key].word);
                speechSynthesis.speak(utterance);
            };
            li.appendChild(pronounceButton);
            masteredList.appendChild(li);
        });
    };

    flashCard.addEventListener('click', () => {
        updateWordDisplay(getRandomWord());
    });

    pronounceBtn.addEventListener('click', () => {
        const currentWord = wordDisplay.textContent;
        const utterance = new SpeechSynthesisUtterance(currentWord);
        speechSynthesis.speak(utterance);
    });

    gotItBtn.addEventListener('click', () => {
        const currentWord = wordDisplay.textContent;
        masteredWords[currentWord] = { word: currentWord, mastered: true };
        delete words[currentWord];
        updateMasteredList();
        updateWordDisplay(getRandomWord());
    });

    needsWorkBtn.addEventListener('click', () => {
        const currentWord = wordDisplay.textContent;
        if (currentWord in masteredWords) {
            words[currentWord] = { word: currentWord, mastered: false };
            delete masteredWords[currentWord];
            updateMasteredList();
        }
        updateWordDisplay(getRandomWord());
    });

    // Initial display
    updateWordDisplay(getRandomWord());
});
