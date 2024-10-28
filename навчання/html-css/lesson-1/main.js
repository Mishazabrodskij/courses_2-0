const zoomContainer = document.querySelector('.zoom-container');
const zoomImage = document.querySelector('.zoom-image');
const zoomLens = document.querySelector('.zoom-lens');

zoomContainer.addEventListener('mousemove', (e) => {
    // Показываем линзу
    zoomLens.style.display = 'block';

    // Получаем размеры контейнера и изображения
    const containerRect = zoomContainer.getBoundingClientRect();
    const lensSize = zoomLens.offsetWidth / 2;

    // Вычисляем позицию линзы относительно курсора
    let lensX = e.clientX - containerRect.left - lensSize;
    let lensY = e.clientY - containerRect.top - lensSize;

    // Ограничиваем движение линзы в пределах изображения
    if (lensX < 0) lensX = 0;
    if (lensY < 0) lensY = 0;
    if (lensX > containerRect.width - zoomLens.offsetWidth) lensX = containerRect.width - zoomLens.offsetWidth;
    if (lensY > containerRect.height - zoomLens.offsetHeight) lensY = containerRect.height - zoomLens.offsetHeight;

    // Перемещаем линзу
    zoomLens.style.left = lensX + 'px';
    zoomLens.style.top = lensY + 'px';

    // Вычисляем позицию фона изображения для зума
    const bgX = (lensX / containerRect.width) * 100;
    const bgY = (lensY / containerRect.height) * 100;

    // Применяем зум к изображению
    zoomImage.style.transform = `scale(2)`; // Измените масштаб по необходимости
    zoomImage.style.transformOrigin = `${bgX}% ${bgY}%`;
});

zoomContainer.addEventListener('mouseleave', () => {
    // Скрываем линзу и сбрасываем зум
    zoomLens.style.display = 'none';
    zoomImage.style.transform = 'scale(1)';
});
