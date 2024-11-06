const terminalOutput = document.getElementById("terminal-output");

const textToType = "Добро пожаловать на мой сайт... (Чтобы ввести команду нажмите Enter)";
let index = 0;

function typeText() {
    if (index < textToType.length) {
        terminalOutput.innerHTML += textToType.charAt(index);
        index++;
        setTimeout(typeText, 40); // скорость печати
    } else {
        const cursor = document.querySelector('.cursor');
        cursor.style.display = 'inline'; 
    }
}

window.onload = function() {
    if (terminalOutput) {
        typeText();
        document.querySelector('.terminal').style.opacity = '1'; // Делаем терминал видимым
        fadeInOnScroll(); // Запускаем анимацию при прокрутке
        initSlider(); // Инициализация слайдера
    }
}

// Функции для модальных окон
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    
    modal.style.display = "block";
    
    setTimeout(() => {
        modal.querySelector('.modal-content').style.opacity = '1';
    }, 10);
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    
    modal.querySelector('.modal-content').style.opacity = '0'; 
    
    setTimeout(() => {
        modal.style.display = "none";
    }, 500);
}

// Обработчик для гамбургера
document.getElementById("hamburger").onclick = function() {
    const navLinks = document.getElementById("nav-links");
    
    if (navLinks.style.display === "block") {
        navLinks.style.display = "none";
    } else {
        navLinks.style.display = "block";
        navLinks.style.animation = "fadeInDown 0.5s";
    }
}

// Функция для анимации при прокрутке
function fadeInOnScroll() {
    const elements = document.querySelectorAll('.scroll-fade');
    
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Убираем элемент из наблюдения
            }
        });
    });

    elements.forEach(element => {
        observer.observe(element); // Наблюдаем за каждым элементом
    });
}

// Инициализация слайдера
function initSlider() {
    let currentSlide = 0;
    
    const slides = document.querySelectorAll('.slide');
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) slide.classList.add('active');
        });
    }

    showSlide(currentSlide);

    setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length; // Переход к следующему слайду
        showSlide(currentSlide);
    }, 3000); // Пауза между слайдами
}

// Функция для обработки команд
function handleCommand(command) {
    if (command === 'maxwell') {
        playSound();
        showCatImage();
    } else {
        console.log('Неизвестная команда:', command);
        playSoundBRUH();
    }

    if (command === 'mzlff') {
        playSound2();
    } else {
        console.log('Неизвестная команда:', command);
        playSoundBRUH();
    }

    if (command === 'GOIDA') {
        playSound3();
    } else {
        console.log('Неизвестная команда:', command);
        playSoundBRUH();
    }

    if (command === 'Kazahstan') {
        playSound4();
    } else {
        console.log('Неизвестная команда:', command);
        playSoundBRUH();
    }
}

// Функция для воспроизведения звука
function playSound() {
    const audio = new Audio('Memes/cat.mp3'); // Укажите путь к вашему звуковому файлу
    audio.play();
}

function playSound2() {
    const audio2 = new Audio('Memes/mzlff.mp3'); // Укажите путь к вашему звуковому файлу
    audio2.play();
}

function playSound3() {
    const audio3 = new Audio('Memes/goida.mp3'); // Укажите путь к вашему звуковому файлу
    audio3.play();
}

function playSound4() {
    const audio4 = new Audio('Memes/kazahstan.mp3'); // Укажите путь к вашему звуковому файлу
    audio4.play();
}

function playSoundBRUH() {
    const audiob = new Audio('Memes/bruh.mp3'); // Укажите путь к вашему звуковому файлу
    audiob.play();
}

// Функция для отображения картинки кота
function showCatImage() {
    const catImageDiv = document.createElement('div');
    catImageDiv.id = 'cat-image';
    
    const img = document.createElement('img');
    img.src = 'Memes/cat.jpg'; // Укажите путь к вашему изображению кота
    img.alt = 'Кот';

    catImageDiv.appendChild(img);
    document.body.appendChild(catImageDiv);

    catImageDiv.style.display = 'flex'; // Показываем изображение

    // Закрытие картинки при клике
    catImageDiv.addEventListener('click', () => {
        catImageDiv.style.display = 'none';
        document.body.removeChild(catImageDiv);
    });
}

// Ввод команд в консоли
window.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const command = prompt('Введите команду:');
        if (command) {
            handleCommand(command.trim().toLowerCase());
        }
    }
});
const canvas = document.getElementById('particlesCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
let mouse = {
    x: null,
    y: null,
    radius: 256 // Радиус области, в которой частицы будут притягиваться к курсору
};

canvas.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 5 + 5; // Размер частицы
        this.speedX = Math.random() * 1 - 0.5; // Скорость по оси X
        this.speedY = Math.random() * 1 - 0.5; // Скорость по оси Y
        this.shape = Math.floor(Math.random() * 3); // Случайная форма (0 - круг, 1 - квадрат, 2 - треугольник)
    }

    update() {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
            this.speedX += dx / distance; // Увеличиваем скорость по оси X
            this.speedY += dy / distance; // Увеличиваем скорость по оси Y
        }

        this.x += this.speedX;
        this.y += this.speedY;

        if (this.size > 0.2) this.size -= 0.05; 
    }

    draw() {
        // Настройка эффекта свечения
        ctx.shadowColor = 'rgba(255, 255, 255, 1)'; // Цвет свечения
        ctx.shadowBlur = 1024; // Размытие свечения

        ctx.fillStyle = 'rgba(255, 255, 255, 1)'; // Цвет самой частицы
        ctx.beginPath();

        // Рисуем случайную форму
        if (this.shape === 0) { // Круг
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        } else if (this.shape === 1) { // Квадрат
            ctx.rect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
        } else if (this.shape === 2) { // Треугольник
            ctx.moveTo(this.x, this.y - this.size); // Вершина
            ctx.lineTo(this.x - this.size, this.y + this.size); // Левый угол
            ctx.lineTo(this.x + this.size, this.y + this.size); // Правый угол
            ctx.closePath();
        }

        ctx.fill();

        // Сброс настроек тени для следующей частицы
        ctx.shadowBlur = 0; 
    }
}

function init() {
    for (let i = 0; i < 50; i++) { // Количество частиц
        particlesArray.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Очищаем канвас
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();

        if (particlesArray[i].size <= 0.2) {
            particlesArray.splice(i, 1); 
            particlesArray.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height)); 
            i--; 
        }
    }
    
    requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

init();
animate();
