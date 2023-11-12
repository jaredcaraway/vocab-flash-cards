document.addEventListener('DOMContentLoaded', () => {
    const words = ['example', 'vocabulary', 'flash', 'card', 'web', 'application'];
    let currentWordIndex = 0;
    const flashCard = document.getElementById('flashCard');
    const wordDisplay = document.getElementById('word');

    flashCard.addEventListener('click', () => {
        if (currentWordIndex >= words.length) {
            currentWordIndex = 0;
        }
        const word = words[currentWordIndex++];
        wordDisplay.textContent = word;

        // Web Speech API for voice synthesis
        const utterance = new SpeechSynthesisUtterance(word);
        speechSynthesis.speak(utterance);
    });
});
