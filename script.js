// ========= ПОДСВЕТКА АКТИВНОГО ПУНКТА МЕНЮ =========
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
});

// ========= ФУНКЦИЯ ДЛЯ ГАЛЕРЕИ (МОДАЛЬНОЕ ОКНО) =========
function openGallery(imgSrc, imgTitle) {
    // Создаём модальное окно
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <img src="${imgSrc}" alt="${imgTitle}">
            <p>${imgTitle}</p>
        </div>
    `;
    document.body.appendChild(modal);
    
    // Закрытие при клике на крестик
    modal.querySelector('.close').onclick = function() {
        modal.remove();
    };
    
    // Закрытие при клике вне изображения
    modal.onclick = function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    };
    
    // Закрытие по клавише ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            modal.remove();
        }
    });
}

// ========= ФУНКЦИЯ ДЛЯ СКАЧИВАНИЯ ФАЙЛОВ =========
function downloadFile(filename, filepath) {
    console.log(`Скачивание файла: ${filename}`);
    
    // Создаём ссылку для скачивания
    const link = document.createElement('a');
    link.href = filepath;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Уведомление о скачивании
    alert(`Файл "${filename}" начал скачивание. Проверьте папку Загрузки.`);
}

// ========= ФУНКЦИЯ ДЛЯ ПОИСКА В ТАБЛИЦЕ =========
function filterTable() {
    const input = document.getElementById('searchInput');
    if (!input) return;
    
    const filter = input.value.toLowerCase();
    const table = document.getElementById('dataTable');
    if (!table) return;
    
    const rows = table.getElementsByTagName('tr');
    
    for (let i = 1; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        let found = false;
        
        for (let j = 0; j < cells.length; j++) {
            const cellText = cells[j].textContent || cells[j].innerText;
            if (cellText.toLowerCase().indexOf(filter) > -1) {
                found = true;
                break;
            }
        }
        
        rows[i].style.display = found ? '' : 'none';
    }
}

// ========= АНИМАЦИЯ ПРИ ПРОКРУТКЕ =========
window.addEventListener('scroll', function() {
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach(element => {
        const position = element.getBoundingClientRect();
        if (position.top < window.innerHeight - 100) {
            element.classList.add('visible');
        }
    });
});

// ========= ИНИЦИАЛИЗАЦИЯ ГАЛЕРЕИ =========
document.addEventListener('DOMContentLoaded', function() {
    // Добавляем обработчики для всех элементов галереи
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const caption = this.querySelector('.gallery-caption');
            const imgSrc = img.src;
            const imgTitle = caption ? caption.textContent : img.alt;
            openGallery(imgSrc, imgTitle);
        });
    });
});

// ========= ВАЛИДАЦИЯ ФОРМЫ =========
function validateForm() {
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');
    
    if (!name || !email || !subject || !message) return true;
    
    if (name.value.trim() === '') {
        alert('Пожалуйста, введите ваше имя');
        name.focus();
        return false;
    }
    
    if (email.value.trim() === '') {
        alert('Пожалуйста, введите ваш email');
        email.focus();
        return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
        alert('Пожалуйста, введите корректный email адрес');
        email.focus();
        return false;
    }
    
    if (subject.value.trim() === '') {
        alert('Пожалуйста, введите тему сообщения');
        subject.focus();
        return false;
    }
    
    if (message.value.trim() === '') {
        alert('Пожалуйста, введите сообщение');
        message.focus();
        return false;
    }
    
    alert('Форма отправлена (демонстрация). В реальном проекте данные ушли бы на сервер.');
    return true;
}

// ========= ОБРАБОТЧИК ФОРМЫ =========
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.onsubmit = function(e) {
            e.preventDefault();
            return validateForm();
        };
    }
});

// ========= ПЛАВНАЯ ПРОКРУТКА К ЯКОРЯМ =========
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
