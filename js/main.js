"use strict";
document.addEventListener("DOMContentLoaded", function() {
    //добавление модального окна на "Моя биография поподробнее"
    const button = document.querySelector(".js-info-switcher");
    const modalWindow = document.querySelector (".modal");
    const closeButton = document.querySelector(".modal__close");

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

    //Табы на "Обо мне" и "Мои проекты"

    const tabsContainer = document.getElementById("js-tabs");

    tabsContainer.addEventListener("click", createTabs);

    function createTabs(event) {
        if (event.target.classList.contains("js-tab-header")) {
            //сделали массив из всех таб-заголовков
            const tabsHeaders = Array.from(tabsContainer.querySelectorAll(".js-tab-header"));
            //присвоили номер каждому таб-заголовку
            const tabIndex = tabsHeaders.indexOf(event.target);
            //отключаем класс актив у всех таб-заголовков
            tabsHeaders.map(tabHeader => tabHeader.classList.remove("section-toggler__button--active"));
            //добавляем целевому элементу класс актив
            event.target.classList.add("section-toggler__button--active");
            
            //разберемся со вкладками
            //положим все вкладки (проекты и инфо) в массив panels
            const panels = Array.from(document.querySelectorAll(".js-tab-panel"));
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

    /* Меню-бургер */
    const toggleBtn = document.querySelector(".js-toggle-button");
    const toggleMenu = document.querySelector(".js-toggle-menu");

    function toggleBurger() {
        toggleBtn.addEventListener("click", function () {
            $(toggleMenu).fadeToggle();
        });
    }
    toggleBurger();

    /* Выключение меню на ресайзе */
    function switchOffBurger(className) {
        $(window).resize(function() {
            $(toggleMenu).fadeIn();
            $(toggleBtn).addClass(className)
        })
    }
    switchOffBurger("main-nav__toggle--active");

    /* Кнопка меню-бургера */
    function toggleHandler(toggle, className) {
        toggle.addEventListener( "click", function(e) {
            e.preventDefault();
            (this.classList.contains(className) === true) ? 
            this.classList.remove(className) : 
            this.classList.add(className);
        });
    }
    toggleHandler(toggleBtn, "nav__toggle--active");
    toggleHandler(toggleBtn, "main-nav__toggle--active");

    /*Кнопка вверх*/
    function handleScrollTop() {
        var button = $(".js-scroll-top");
        
        if (button.length === 0) return;
        var viewportHeight = "innerHeight" in window ? window.innerHeight
                            : document.documentElement.offsetHeight;

        $(window).scroll(function () {
            var topPos = $(this).scrollTop();
            if (topPos > viewportHeight) {
                button.css("opacity", "1");
            } else {
                button.css("opacity", "0");
            }
        });

        button.click(function () {
            $('html, body').animate({
                scrollTop: 0
            }, 600);
            return false;

        });
    }
    handleScrollTop();
})
