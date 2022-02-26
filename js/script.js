/*==========================================================================================================================================================================*/
/* Проверка устройства, на котором открыта страница */
const isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (
            isMobile.Android() ||
            isMobile.BlackBerry() ||
            isMobile.iOS() ||
            isMobile.Opera() ||
            isMobile.Windows());
    }
};


function isIE() {
    ua = navigator.userAgent;
    var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
    return is_ie;
}
if (isIE()) {
    document.querySelector("body").classList.add("ie");
}
if (isMobile.any()) {
    document.querySelector("body").classList.add("_touch");
}



/*==========================================================================================================================================================================*/
/* Проверка браузера на поддержку формата webp */
function testWebP(callback) {
    let webP = new Image();
    webP.onload = webP.onerror = function () {
        callback(webP.height == 2);
    };
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
testWebP(function (support) {
    if (support == true) {
        document.querySelector("body").classList.add("_webp");
    } else {
        document.querySelector("body").classList.add("_no-webp");
    }
});



/*==========================================================================================================================================================================*/
/* Задание Изображению в HTML (<img>) Свойства Фона */
function ibg() {
    if (isIE()) {
        let _ibg = document.querySelectorAll("._ibg");
        for (let i = 0; i < _ibg.length; i++) {
            if (_ibg[i].querySelector("img") && _ibg[i].querySelector("img").getAttribute("src") != null) {
                _ibg[i].style.backgroundImage = "url(" + _ibg[i].querySelector("img").getAttribute("src") + ")";
            }
        }
    }
}
ibg();



/*==========================================================================================================================================================================*/
/* Menu Burger */
const iconMenu = document.querySelector(".menu-header__icon");
const menuBody = document.querySelector(".header__menu");
if (iconMenu) {
    iconMenu.addEventListener("click", function (e) {
        document.body.classList.toggle("_lock");
        iconMenu.classList.toggle("_active");
        menuBody.classList.toggle("_active");
    });
}


function menu_close() {
    let iconMenu = document.querySelector(".icon-menu");
    let menuBody = document.querySelector(".menu__body");
    iconMenu.classList.remove("_active");
    menuBody.classList.remove("_active");
}



/*==========================================================================================================================================================================*/
/* Плавная прокрутка до раздела сайта */
const menuLinks = document.querySelectorAll("[data-goto]");              
if (menuLinks.length > 0) {                                                                 
	menuLinks.forEach(menuLink => {                                                     
		menuLink.addEventListener("click", onMenuLinkClick);                                
	});
	function onMenuLinkClick(e) {
		const menuLink = e.target;                                                         
		if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
			const gotoBlock = document.querySelector(menuLink.dataset.goto);               
			const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector("header").offsetHeight;
			if (iconMenu.classList.contains("_active")) {                                 
				document.body.classList.remove("_lock");                                
				iconMenu.classList.remove("_active");                                   
				menuBody.classList.remove("_active");                                
			}
			window.scrollTo({                                                     
				top: gotoBlockValue,                                                  
				behavior: "smooth"                                           
			});
			e.preventDefault();                                                 
		}
	}
}



/*==========================================================================================================================================================================*/
/* Кнопка "Вверх" */
window.addEventListener("scroll", showButton);
function showButton() {
	let buttonUp = document.querySelector(".main__button-up");
	if (window.pageYOffset > 200) {
		buttonUp.classList.add("_active");
	}
	buttonUp.addEventListener("click", function () {
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	});
}



/*==========================================================================================================================================================================*/
/* Анимация Чисел */
window.addEventListener("DOMContentLoaded", function () {
	const options = {
		root: null,
		rootMargin: "-100px",
		threshold: 1,
	}


	const observer = new IntersectionObserver((entries, observer) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				let start = +entry.target.innerHTML;
				let end = +entry.target.dataset.max;
				let interval = setInterval(function () {
					entry.target.innerHTML = ++start;
					if (start == end) {
						clearInterval(interval);
					}
				}, 5);
				observer.unobserve(entry.target);
			}
		})
	}, options);
	document.querySelectorAll(".about__value").forEach(item => {
		observer.observe(item);
	})
})



/*==========================================================================================================================================================================*/
/* Tabs */
let tabButtons = document.querySelectorAll(".tab-about__button");
for (let i = 0; i < tabButtons.length; i++) {
	const tabButton = tabButtons[i];
	tabButton.addEventListener("click", function (e) {
		let tabCarts = document.querySelectorAll(".tabs-about__tab");
		for (let i = 0; i < tabCarts.length; i++) {
			const tabCart = tabCarts[i];
			if (tabCart.classList.contains("_active")) {
				tabCart.classList.remove("_active");
			}
			if (window.innerWidth > 991.98) {
				tabButton.closest(".tabs-about__tab").classList.add("_active");
			} else {
				let tabButtonPath = this.getAttribute("data-tab");
				if (tabButtonPath = tabCart.classList.contains("_" + tabButtonPath)) {
					tabCart.classList.add("_active");
				}
			}
		}
	});
};


let tab = function () {
    let tabNav = document.querySelectorAll(".tabs-nav__item"),
        tabContent = document.querySelectorAll(".services-tabs__tab"),
        tabName;
    tabNav.forEach(item => {
        item.addEventListener("click", selectTabNav)
    });


    function selectTabNav() {
        tabNav.forEach(item => {
            item.classList.remove("_active");
        });
        this.classList.add("_active");
        tabName = this.getAttribute("data-tab");
        selectTabContent(tabName);
    }


    function selectTabContent(tabName) {
        tabContent.forEach(item => {
            item.classList.contains(tabName) ? item.classList.add("_active") : item.classList.remove("_active");
        })
    }
};
tab();



/*==========================================================================================================================================================================*/
/* Динамический Адаптив */
(function () {
	let originalPositions = [];
	let daElements = document.querySelectorAll("[data-da]");
	let daElementsArray = [];
	let daMatchMedia = [];
	if (daElements.length > 0) {
		let number = 0;
		for (let index = 0; index < daElements.length; index++) {
			const daElement = daElements[index];
			const daMove = daElement.getAttribute("data-da");
			if (daMove != "") {
				const daArray = daMove.split(",");
				const daPlace = daArray[1] ? daArray[1].trim() : "last";
				const daBreakpoint = daArray[2] ? daArray[2].trim() : "767";
				const daType = daArray[3] === "min" ? daArray[3].trim() : "max";
				const daDestination = document.querySelector("." + daArray[0].trim())
				if (daArray.length > 0 && daDestination) {
					daElement.setAttribute("data-da-index", number);
					originalPositions[number] = {
						"parent": daElement.parentNode,
						"index": indexInParent(daElement)
					};
					daElementsArray[number] = {
						"element": daElement,
						"destination": document.querySelector("." + daArray[0].trim()),
						"place": daPlace,
						"breakpoint": daBreakpoint,
						"type": daType
					}
					number++;
				}
			}
		}
		dynamicAdaptSort(daElementsArray);
		for (let index = 0; index < daElementsArray.length; index++) {
			const el = daElementsArray[index];
			const daBreakpoint = el.breakpoint;
			const daType = el.type;
			daMatchMedia.push(window.matchMedia("(" + daType + "-width: " + daBreakpoint + "px)"));
			daMatchMedia[index].addListener(dynamicAdapt);
		}
	}


	function dynamicAdapt(e) {
		for (let index = 0; index < daElementsArray.length; index++) {
			const el = daElementsArray[index];
			const daElement = el.element;
			const daDestination = el.destination;
			const daPlace = el.place;
			const daBreakpoint = el.breakpoint;
			const daClassname = "_dynamic_adapt_" + daBreakpoint;
			if (daMatchMedia[index].matches) {
				if (!daElement.classList.contains(daClassname)) {
					let actualIndex = indexOfElements(daDestination)[daPlace];
					if (daPlace === "first") {
						actualIndex = indexOfElements(daDestination)[0];
					} else if (daPlace === "last") {
						actualIndex = indexOfElements(daDestination)[indexOfElements(daDestination).length];
					}
					daDestination.insertBefore(daElement, daDestination.children[actualIndex]);
					daElement.classList.add(daClassname);
				}
			} else {
				if (daElement.classList.contains(daClassname)) {
					dynamicAdaptBack(daElement);
					daElement.classList.remove(daClassname);
				}
			}
		}
	}


	dynamicAdapt();


	function dynamicAdaptBack(el) {
		const daIndex = el.getAttribute("data-da-index");
		const originalPlace = originalPositions[daIndex];
		const parentPlace = originalPlace["parent"];
		const indexPlace = originalPlace["index"];
		const actualIndex = indexOfElements(parentPlace, true)[indexPlace];
		parentPlace.insertBefore(el, parentPlace.children[actualIndex]);
	}


	function indexInParent(el) {
		var children = Array.prototype.slice.call(el.parentNode.children);
		return children.indexOf(el);
	}


	function indexOfElements(parent, back) {
		const children = parent.children;
		const childrenArray = [];
		for (let i = 0; i < children.length; i++) {
			const childrenElement = children[i];
			if (back) {
				childrenArray.push(i);
			} else {
				if (childrenElement.getAttribute("data-da") == null) {
					childrenArray.push(i);
				}
			}
		}
		return childrenArray;
	}


	function dynamicAdaptSort(arr) {
		arr.sort(function (a, b) {
			if (a.breakpoint > b.breakpoint) {
				return -1
			} else {
				return 1
			}
		});
		arr.sort(function (a, b) {
			if (a.place > b.place) {
				return 1
			} else {
				return -1
			}
		});
	}
}());



/*==========================================================================================================================================================================*/
/* Slider Swiper */
window.onload = function() {
    if (document.querySelector(".reviews-slider")) {
        let sliderReviews = new Swiper(".reviews-slider", {
            navigation: {
                prevEl: ".reviews-slider__button-prev",
                nextEl: ".reviews-slider__button-next",
            },
            keyboard: {
                enabled: true,
                onlyInViewport: true,
                pageUpDown: true,
            },
            slidesPerView: 1,
            autoplay: {
                delay: 3000,
            },
            loop: true,
            loopedSlides: 3,
            speed: 1000,
        })
    }
};



/*==========================================================================================================================================================================*/
/* Popup */
const popupLinks = document.querySelectorAll(".popup-link");					
const body = document.querySelector("body");												
const lockPadding = document.querySelectorAll(".lock");				
let unlock = true;														
const timeout = 800;															


if (popupLinks.length > 0) {											
	for (let index = 0; index < popupLinks.length; index++) {
		const popupLink = popupLinks[index];
		popupLink.addEventListener("click", function (e) {
			const popupName = popupLink.getAttribute("href").replace("#", "");
			const curentPopup = document.getElementById(popupName);
			popupOpen(curentPopup);
			e.preventDefault();
		});
	}
}


const popupCloseIcon = document.querySelectorAll("._icon-close");
if (popupCloseIcon.length > 0) {												
	for (let index = 0; index < popupCloseIcon.length; index++) {
		const el = popupCloseIcon[index];								
		el.addEventListener("click", function (e) {							
			popupClose(el.closest(".services-pop-up"));						
			e.preventDefault();												
		});
	}
}


function popupOpen(curentPopup) {											
	if (curentPopup && unlock) {							
		const popupActive = document.querySelector(".pop-up._open");
		if (popupActive) {														
			popupClose(popupActive, false);										
		} else {													
			bodyLock();
		}
		curentPopup.classList.add("_open");									
		curentPopup.addEventListener("click", function (e) {				
			if (!e.target.closest(".popup__content")) {						
				popupClose(e.target.closest(".services-pop-up"));				
			}
		});
	}
}


function popupClose(popupActive, doUnlock = true) {							
	if (unlock) {														
		popupActive.classList.remove("_open");								
		if (doUnlock) {															
			bodyUnLock();													
		}
	}
}



/*==========================================================================================================================================================================*/
/* Скрытие, блокировка и разблокировка скролла */
function bodyLock() {															
	const lockPaddingValue = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
	if (lockPadding.length > 0) {												
		for (let index = 0; index < lockPadding.length; index++) {			
			const el = lockPadding[index];									
			el.style.paddingRight = lockPaddingValue;					
		}
	}
	body.style.paddingRight = lockPaddingValue;									
	body.classList.add("_lock");												
	unlock = false;															
	setTimeout(function () {												
		unlock = true;														
	}, timeout);																
}


function bodyUnLock() {														
	setTimeout(function () {													
		if (lockPadding.length > 0) {										
			for (let index = 0; index < lockPadding.length; index++) {		
				const el = lockPadding[index];									
				el.style.paddingRight = "0px";								
			}
		}
		body.style.paddingRight = "0px";									
		body.classList.remove("_lock");										
	}, timeout);															
	unlock = false;														
	setTimeout(function () {												
		unlock = true;															
	}, timeout);															
}



/*==========================================================================================================================================================================*/
/* Закрытие popup с помощью клавиши "Esc" на клавиатуре */
document.addEventListener("keydown", function (e) {							
	if (e.which === 27) {						
		const popupActive = document.querySelector(".popup._open");
		popupClose(popupActive);												
	}
});



/*==========================================================================================================================================================================*/
/* Полифилы */
(function () {
	if (!Element.prototype.closest) {										
		Element.prototype.closest = function (css) {							
			var node = this;
			while (node) {
				if (node.matches(css)) return node;
				else node = node.parentElement;
			}
			return null;
		};
	}
})();


(function () {
	if (!Element.prototype.matches) {											
		Element.prototype.matches = Element.prototype.matchesSelector ||	
			Element.prototype.webkitMatchesSelector ||
			Element.prototype.mozMatchesSelector ||
			Element.prototype.msMatchesSelector;
	}
})();



/*==========================================================================================================================================================================*/
/* Google Maps */
window.addEventListener("DOMContentLoaded", function () {
	const googleMap = document.getElementById("map");
	let flagMap = 0;
	window.addEventListener("scroll", initMap);


	function initMap() {
		let scrollY = window.scrollY;
		if (scrollY >= ((googleMap.offsetTop - window.innerHeight) - 800) && (flagMap === 0)) {
			flagMap = 1;
			const myCoord = {
				lat: 53.567496725611946,
				lng: 10.039506669689063,
			};
			let map = new google.maps.Map(document.getElementById("map"), {
				center: myCoord,
				zoom: 15,
			});
			let marker = new google.maps.Marker({
				position: myCoord,
				map: map,
				title: "Med Lab",
			});
		}
	}
	initMap();
})