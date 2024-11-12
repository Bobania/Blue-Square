document.addEventListener("DOMContentLoaded", function() {
    const eggImage = document.getElementById("eggImage");

    // Обработчик события клика
    eggImage.addEventListener("click", function() {
        // Добавляем класс для анимации
        eggImage.classList.add("shakeCurve"); // Запускаем анимацию с дугой

        // Удаляем анимацию после завершения, чтобы можно было запустить её снова
        eggImage.addEventListener("animationend", function() {
            eggImage.classList.remove("shakeCurve"); // Убираем анимацию
        }, { once: true });
    });
});

