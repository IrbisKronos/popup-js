const popup_module_init = (event) => {

    window.getCookie = (name) => {
        let matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }
    window.setCookie = (name, value, options = {}) => {
        options = {
            path: '/',
            // при необходимости другие значения по умолчанию
            ...options
        };
        if (options.expires instanceof Date) {
            options.expires = options.expires.toUTCString();
        }
        let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
        for (let optionKey in options) {
            updatedCookie += "; " + optionKey;
            let optionValue = options[optionKey];
            if (optionValue !== true) {
                updatedCookie += "=" + optionValue;
            }
        }
        document.cookie = updatedCookie;
    }
    window.removeCookie = (name) => {
        let options = {
            path: '/',
            ...options,
            expires: -1
        };
        let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent('undefined');
        for (let optionKey in options) {
            updatedCookie += "; " + optionKey;
            let optionValue = options[optionKey];
            if (optionValue !== true) {
                updatedCookie += "=" + optionValue;
            }
        }
        document.cookie = updatedCookie;
    }
    window.addCSS = (fileName) => {
        let head = document.head;
        let link = document.createElement("link");
        link.type = "text/css";
        link.rel = "stylesheet";
        link.href = fileName;
        head.appendChild(link);
    }
    const init_params_from_get_my = () => {
        let site_url_string = window.location.href
        let site_url = new URL(site_url_string);
        if (site_url.searchParams.get("popup_module")) {
            let app_partner_notifier_id = site_url.searchParams.get("popup_module")
            setCookie('popup_module', app_partner_notifier_id, cookie_params)
        }
    }
    const load_settings_from_server = async () => {
        let response = await fetch('popup.json');
        if (response.ok) {
            return await response.json();
        } else {
            alert("Ошибка HTTP: " + response.status);
        }
    }

    /* Create popup-banner */
    const add_banner = (setting) => {


        const popupBlock = document.createElement('div');
        popupBlock.classList.add("popup");
        document.body.append(popupBlock);

        const popupBody = document.createElement('div');
        popupBody.classList.add("popup__body");
        popupBlock.append(popupBody);

        const popupContent = document.createElement('div');
        popupContent.classList.add("popup__content");
        popupContent.style.textAlign = setting.align_text;
        popupBody.append(popupContent);

        const popupCloser = document.createElement('button');
        popupCloser.classList.add("popup__close");
        popupContent.append(popupCloser);
        popupCloser.innerHTML = '&times;';

        const popupTitle = document.createElement('div');
        popupTitle.classList.add("popup__title");
        popupContent.append(popupTitle);
        popupTitle.innerHTML = setting.title;

        const popupText = document.createElement('div');
        popupText.classList.add("popup__text");
        popupContent.append(popupText);
        popupText.innerHTML = setting.text;

        const popupLink = document.createElement('a');
        popupLink.classList.add("popup__link");
        popupContent.append(popupLink);
        popupLink.setAttribute('href', setting.button_link);
        popupLink.innerHTML = setting.button_name;

        addCSS("/popup/popupMy.css");

        /* Close popup */
        function popupClose() {
            popupBlock.classList.remove("open");
        }

        const popupCloseIcon = document.querySelector(".popup__close");
        popupCloseIcon.addEventListener("click", popupClose);

        /* Open popup + can be close by clock around  popup__content */
        function popupOpen() {
            popupBlock.classList.add("open");
            popupBlock.addEventListener("click", (e) => {
                if (!e.target.closest('.popup__content')) {
                    popupClose(e.target.closest('.popup'));
                }
            });
        }

        let timer = Number(setting.timeout + '000'); // convert ms to s

        setTimeout(() => {
            popupOpen();
            document.querySelector(".popup").style.transition = "all 0.8s ease 0s";
        }, timer);

        document.querySelector("open").addEventListener("click", () => popupClose());

    }

        let popup_date = new Date()
        popup_date.setDate(new Date().getDate() + 30);
        const cookie_params = {
            expires: popup_date.toUTCString(),
            path: '/',
            secure: true
        }

        load_settings_from_server().then((settings) => {
            init_params_from_get_my()
            console.log('settings', settings)
            add_banner(settings)
        })

}
document.addEventListener("DOMContentLoaded", (event) => popup_module_init(event));