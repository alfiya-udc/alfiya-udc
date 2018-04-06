//в этом блоке - добавление модального окна на "Моя биография поподробнее"

let button = document.querySelector(".js-info-switcher");
let modalWindow = document.querySelector (".modal");
let closeButton = document.querySelector(".modal__close");


function showModal () {
    modalWindow.style.display = "block";
}

function hideModal() {
    modalWindow.style.display = "none";
}

function removeModalFromWindow() {
    if (event.target === modalWindow) {
        modalWindow.style.display = "none";
    }
}

button.addEventListener("click", showModal);
closeButton.addEventListener("click", hideModal);
window.addEventListener("click", removeModalFromWindow);

//Здесь добавляю табы на "Обо мне" и "Мои проекты"

let tabsContainer = document.getElementById("js-tabs");
tabsContainer.addEventListener("click", createTabs);

function createTabs(event) {

    if (event.target.classList.contains("js-tab-header")) {
        //сделали массив из всех таб-заголовков
        let tabsHeaders = Array.from(tabsContainer.querySelectorAll(".js-tab-header"));
        //присвоили номер каждому таб-заголовку
        let tabIndex = tabsHeaders.indexOf(event.target);
        //отключаем класс актив у всех таб-заголовков
        tabsHeaders.map(tabHeader => tabHeader.classList.remove("section-toggler__button--active"));
        //добавляем целевому элементу класс актив
        event.target.classList.add("section-toggler__button--active");
        
        //разберемся со вкладками
        //положим все вкладки (проекты и инфо) в массив panels
        let panels = Array.from(document.querySelectorAll(".js-tab-panel"));
        //если индекс совпадает с активным, то показать, если нет, то скрыть
        for (let i = 0; i< panels.length; i++) {
            if (tabIndex === i) {
                panels[i].style.display = "block";
            } else {
                panels[i].style.display = "none";
            }
        }
    }
}

