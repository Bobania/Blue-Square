const square = document.querySelector('.square');
const switchColorButton = document.getElementById('switchColorButton');
const scoreDisplay = document.getElementById('score');
const upgradeButton = document.getElementById('upgradeButton');
const shopImage = document.getElementById('shopImage');

const eggImage = document.getElementById('eggImage'); //  яйцo
const heart = document.getElementById('heart');
const addPointsButton = document.getElementById('addPointsButton');
const shopButton = document.getElementById('shopButton');
const autoButton = document.getElementById('autoButton');

let colorChangeEnabled = false;
let heartButtonPurchased = false;
let score = 0;
let pointsPerClick = 1; // Очки за клик
let upgradeCost = 20; // Начальная стоимость улучшения
let shopPrice = 500; // Стоимость кнопки love
let addPointsCost = 300; // Стоимость кнопки +5
let pointsPerClickIncreaseFive = 5; // Увеличение очков за клик

let autoEnabled = false; // Переменная для отслеживания, активирована ли автоматическая функция
let autoCost = 750; // Стоимость автоматической функции

function updateScoreDisplay() {
    scoreDisplay.innerText = `Score: ${score}`;
    pointsPerClickDisplay.innerText = `Клик: ${pointsPerClick}`;
    if (score >= 100) {
        document.getElementById('eggImage').style.display = 'block'; // Показываем изображение яйца
    }
    updateUpgradeButton(); // Обновляем текст на кнопке улучшения
}

function updateUpgradeButton() {
    upgradeButton.innerText = `+1 Клик (${upgradeCost} ОЧ.)`; // Обновляем текст на кнопке улучшения
}

function changeColor() {
    square.style.backgroundColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function shakeSquare() {
    square.classList.add('shake'); // Добавляем класс для анимации
    setTimeout(() => {
        square.classList.remove('shake'); // Удаляем класс после завершения анимации
    }, 200); // Длительность анимации (200ms)
}

square.addEventListener('click', () => {
    if (colorChangeEnabled) {
        changeColor();
    }
    shakeSquare();
    score += pointsPerClick; // Увеличиваем счет на количество очков за клик
    updateScoreDisplay(); // Обновляем отображение счета
});

upgradeButton.addEventListener('click', function() {
    if (score >= upgradeCost) { // Проверяем, достаточно ли очков для улучшения
        score -= upgradeCost; 
        pointsPerClick += 1;// Уменьшаем счет на стоимость улучшения // Увеличиваем очки за клик на 50%
        upgradeCost = Math.floor(upgradeCost * 1.5); // Увеличиваем стоимость улучшения
        updateScoreDisplay(); // Обновляем отображение счета
    } else {
        alert('Недостаточно очков для улучшения!'); // Уведомление о недостатке очков
    }
});



shopButton.addEventListener('click', () => {
    if (score >= shopPrice) { // Проверяем, достаточно ли очков для покупки
        score -= shopPrice; // Уменьшаем счет на стоимость покупки
        updateScoreDisplay(); // Обновляем отображение счета

        // Заменяем изображение на кнопке
        shopImage.src = "icons/redheart.png"; // Укажите путь к новому изображению
        shopPrice = 0;
        document.querySelector('.shop-price').innerText = `${shopPrice} ОЧ.`;
        shopButton.style.backgroundColor = '#822127'; 
        heartButtonPurchased = true; // Устанавливаем переменную в true
    } else {
        alert('Недостаточно очков для покупки!'); // Уведомление о недостатке очков
    }
});

// Инициализируем отображение счета и кнопки улучшения
updateScoreDisplay();

switchColorButton.addEventListener('click', () => {
    colorChangeEnabled = !colorChangeEnabled; // Переключаем состояние

    if (colorChangeEnabled) {
        switchColorButton.style.backgroundColor = 'green'; // Цвет кнопки при активной функции
    } else {
        switchColorButton.style.backgroundColor = '#333'; // Исходный цвет кнопки
    }
});
eggImage.addEventListener('click', (event) => {
    if (heartButtonPurchased) { // Проверяем, была ли куплена кнопка
        showHeart(event.clientX, event.clientY); // Показываем сердечко в месте нажатия
    }  // Уведомление, если кнопка не куплена
   
});;

addPointsButton.addEventListener('click', () => {
    if (score >= addPointsCost) { // Проверяем, достаточно ли очков для покупки
        score -= addPointsCost; // Уменьшаем счет на стоимость покупки
        pointsPerClick += pointsPerClickIncreaseFive; // Увеличиваем очки за клик
        addPointsCost = 0; // Увеличиваем стоимость следующей покупки
        updateScoreDisplay(); // Обновляем отображение счета
        pointsPerClickIncreaseFive = 0;
        addPointsButton.style.backgroundColor = '#822127';
        addPointsButton.disabled = true;
        document.getElementById('addPointsPriceDisplay').innerText = `${addPointsCost} ОЧ.`; // Обновляем стоимость
    } else {
        alert('Недостаточно очков для покупки!'); // Уведомление о недостатке очков
    }
});

autoButton.addEventListener('click', () => {
    if (score >= autoCost) { // Проверяем, достаточно ли очков для покупки
        score -= autoCost; // Уменьшаем счет на стоимость покупки
        autoEnabled = true; // Активируем автоматическую функцию
        updateScoreDisplay(); // Обновляем отображение счета
        autoCost = 0;
        autoButton.disabled = true;
        autoButton.style.backgroundColor = '#822127';
        document.getElementById('autoButtonPriceDisplay').innerText = `${autoCost} ОЧ.`;
        // Запускаем автоматическое добавление очков каждые 3 секунды
        
        setInterval(() => {
            if (autoEnabled) {
                score += pointsPerClick; // Увеличиваем счет на количество очков за клик
                updateScoreDisplay(); // Обновляем отображение счета
            }
        }, 1500); // 1000 миллисекунд = 1 сек
    } else {
        alert('Недостаточно очков для покупки!'); // Уведомление о недостатке очков
    }
});

function showHeart(x, y) {
    heart.style.display = 'block'; // Показываем сердечко
    heart.style.left = `${x - 25}px`; // Позиционируем сердечко по X
    heart.style.top = `${y - 25}px`; // Позиционируем сердечко по Y

    // Добавляем класс для анимации исчезновения
    heart.classList.add('fade-out');

    // Убираем сердечко через 1 секунду
    setTimeout(() => {
        heart.style.display = 'none';
        heart.classList.remove('fade-out'); // Удаляем класс для следующего показа
    }, 1000);
}



