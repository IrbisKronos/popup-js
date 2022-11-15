const popup_module_init = (event) => {
    const get_cookie = (name) => {
        let matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }
    const set_cookie = (name, value, options = {}) => {
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
    const remove_cookie = (name) => {
        let options = {
            path: '/',
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
    const add_css = (fileName) => {
        let head = document.head;
        let link = document.createElement("link");
        link.type = "text/css";
        link.rel = "stylesheet";
        link.href = fileName;
        head.appendChild(link);
    }

    /* Create popup-banner */
    const register_popup_container = () => {
        add_css('https://artem.bobmv.art/popup.css');
        const popup_root_block = document.createElement('div');
        popup_root_block.classList.add("popup_root_block");
        popup_root_block.id = 'popup_root_block';
        document.body.appendChild(popup_root_block);
    }

    const init_params_from_get = () => {
        let site_url_string = window.location.href
        let site_url = new URL(site_url_string);
        if (site_url.searchParams.get("popup_module")) {
            let app_partner_notifier_id = site_url.searchParams.get("popup_module")
            set_cookie('popup_module', app_partner_notifier_id, cookie_params)
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

    const add_banner = (setting) => {
        const popup_banner_component = document.createElement('div');
        popup_banner_component.classList.add("popup_banner_component");
        popup_banner_component.classList.add("animate__flipInX");
        if (setting.header) {
            popup_banner_component.innerHTML += '<div class="popup_banner_header">' + setting.header.title + '</div>'
            const popup_banner_header = document.createElement('div');
            popup_banner_header.classList.add("popup_banner_header");
            popup_banner_header.innerHTML = setting.header.title;
            //todo add header color
            popup_banner_header.style.color = setting.header.color;
            popup_banner_component.appendChild(popup_banner_header);
        }

        popup_banner_component.innerHTML += '<div class="popup_banner_body">\n' +
            '    <div class="popup_banner_body_image">\n' +
            '      <img src="image.jpg" alt="">\n' +
            '    </div>\n' +
            '    <div class="popup_banner_body_right_title">Title</div>\n' +
            '    <div class="popup_banner_body_right_description">Description</div>\n' +
            '    <div class="popup_banner_body_right_button">\n' +
            '      <a href="https://www.google.com/">Button</a>\n' +
            '    </div>\n' +
            '  </div>'
        if (setting.footer) {
            popup_banner_component.innerHTML += '<div class="popup_banner_footer">' + setting.footer + '</div>'
        }
        console.log('document', document)
        document.getElementById('popup_root_block').appendChild(popup_banner_component);
    }

    let animation_list = [
        'animate__bounce',
        'animate__pulse',
        'animate__rubberBand',
        'animate__headShake',
        'animate__tada',
        'animate__zoomInLeft',
        'animate__slideInUp',
        'animate__slideInUp',
    ]

    let popup_date = new Date()
    popup_date.setDate(new Date().getDate() + 30);
    const cookie_params = {
        expires: popup_date.toUTCString(),
        path: '/',
        secure: true
    }

    load_settings_from_server().then((settings) => {
        register_popup_container()
        init_params_from_get()
        console.log('settings', settings)
        add_banner(settings)
    })
}
document.addEventListener("DOMContentLoaded", (event) => popup_module_init(event));