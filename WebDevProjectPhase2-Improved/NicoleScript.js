document.addEventListener('DOMContentLoaded', () => {
    const quotes = [
        {
            text: "At Pear, we merge innovation with simplicity, offering sleek laptops and devices that empower you to achieve more.",
            author: "Steve Occupations"
        },
        {
            text: "At Pear, our commitment to excellence drives us to create technology that not only performs but inspires you to reach new heights.",
            author: "Steve Occupations"
        },
        {
            text: "Innovation at Pear means blending cutting-edge technology with user-friendly design, ensuring you can achieve your goals effortlessly.",
            author: "Steve Occupations"
        },
        {
            text: "Pear devices are crafted with precision and passion, offering the perfect balance of power and simplicity to elevate your daily experience.",
            author: "Steve Occupations"
        }
    ];

    let currentQuoteIndex = 0;
    const quoteText = document.getElementById('quoteText');
    const quoteAuthor = document.getElementById('quoteAuthor');

    function showNextQuote() {
        quoteText.classList.add('fade');
        quoteAuthor.classList.add('fade');

        setTimeout(() => {
            currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
            const nextQuote = quotes[currentQuoteIndex];

            quoteText.textContent = `"${nextQuote.text}"`;
            quoteAuthor.textContent = nextQuote.author;

            quoteText.classList.remove('fade');
            quoteAuthor.classList.remove('fade');
        }, 1000);
    }

    setInterval(showNextQuote, 5000);
});