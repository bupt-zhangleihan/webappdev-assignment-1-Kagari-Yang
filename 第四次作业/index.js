const quotes = [
    'When you have eliminated the impossible, whatever remains, however improbable, must be the truth.',
    'There is nothing more deceptive than an obvious fact.',
    'I ought to know by this time that when a fact appears to be opposed to a long train of deductions it invariably proves to be capable of bearing some other interpretation.',
    'I never make exceptions. An exception disproves the rule.',
    'What one man can invent another can discover.',
    'Nothing clears up a case so much as stating it to another person.',
    'Education never ends, Watson. It is a series of lessons, with the greatest for the last.',
];

let words = [];
let wordIndex = 0;
let startTime;

const quoteElement = document.getElementById('quote');
const messageElement = document.getElementById('message');
const typedValueElement = document.getElementById('typed-value');
const bestTimeElement = document.getElementById('bestTime'); // 确保HTML中有该ID的元素

typedValueElement.disabled = true; // 初始禁用输入框

document.getElementById('start').addEventListener('click', function () {
    typedValueElement.disabled = false; // 开始时启用输入框
    typedValueElement.value = ''; // 清空输入框
    typedValueElement.className = ''; // 重置输入框的样式

    const quoteIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[quoteIndex];
    words = quote.split(' '); // 将引用分割为单词数组
    wordIndex = 0;

    quoteElement.innerHTML = words.map(function(word) { return `<span>${word} </span>`; }).join('');
    quoteElement.childNodes[0].className = 'highlight';
    messageElement.innerText = '';

    typedValueElement.focus(); // 文本框获得焦点
    startTime = new Date().getTime(); // 开始计时
});

typedValueElement.addEventListener('input', () => {
    const currentWord = words[wordIndex];
    const typedValue = typedValueElement.value;

    if (typedValue.endsWith(' ') || wordIndex === words.length - 1) {
        if (typedValue.trim() === currentWord || (wordIndex === words.length - 1 && typedValue.trim() === currentWord + '.')) {
            if (wordIndex === words.length - 1) {
                const elapsedTime = new Date().getTime() - startTime;
                const timeInSeconds = (elapsedTime / 1000).toFixed(2);
                const bestTimeInSeconds = updateBestTime(elapsedTime);

                const message = `恭喜！你完成了打字，在 ${timeInSeconds} 秒内。最佳时间：${bestTimeInSeconds} 秒。`;
                messageElement.innerText = message;
                window.alert(message);
                typedValueElement.disabled = true;
                return;
            }
            // 如果不是最后一个单词，准备输入下一个单词
            typedValueElement.value = '';
            wordIndex++;
            updateHighlight();
        } else {
            typedValueElement.className = 'error';
        }
    } else {
        typedValueElement.className = currentWord.startsWith(typedValue) ? '' : 'error';
    }
});

function updateBestTime(elapsedTime) {
    const bestTime = parseFloat(localStorage.getItem('bestTime')) || Infinity;
    if (elapsedTime < bestTime) {
        localStorage.setItem('bestTime', elapsedTime);
    }
    const bestTimeInSeconds = (Math.min(elapsedTime, bestTime) / 1000).toFixed(2);
    bestTimeElement.innerText = `最佳时间: ${bestTimeInSeconds} 秒`;
    return bestTimeInSeconds;
}

function updateHighlight() {
    for (const wordElement of quoteElement.childNodes) {
        wordElement.className = '';
    }
    quoteElement.childNodes[wordIndex].className = 'highlight';
}

window.onload = () => {
    const bestTime = localStorage.getItem('bestTime');
    if (bestTime) {
        bestTimeElement.innerText = `最佳时间: ${(bestTime / 1000).toFixed(2)} 秒`;
    }
};
