window.getСookie = (name) => {
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
// Приклад використання: setCookie('user', 'John', {secure: true, 'max-age': 3600});

window.addCSS = (fileName) => {
   let head = document.head;
   let link = document.createElement("link");
   link.type = "text/css";
   link.rel = "stylesheet";
   link.href = fileName;
   head.appendChild(link);
}

document.addEventListener("DOMContentLoaded", function () {
   addCSS("./popup.css");
   const popupBlock = document.createElement('div');
   popupBlock.classList.add("popup");
   popupBlock.innerHTML = "" +
      "<div class='popup__body'>" +
      "<div class='popup__content'>" +
      //"<a href='#' id='popup__close'>&times;</a>" +
      "<button сlass='popup__close'>&times;</button>" +
      "<div class='popup__title'>Popup-title</div>" +
      "<div class='popup__text'>" +
      "Lorem ipsum, dolor sit amet consecteturadipisicing elit. Vitae laboriosammolestiae delectus, dolor" +
      "distinctio deserunt praesentium fugit cumqueeligendi tempora voluptatum mollitiaexpedita aut, laborum" +
      "repudiandaeGjg nobis repellat, quidemratione." +
      "</div>" +
      "<a href='' class='popup__link'>Link</a>" +
      "</div>" +
      "</div>";

   document.body.appendChild(popupBlock);
   setTimeout(() => popupBlock.classList.add("open"), 2000);

   document.querySelector("popup__close").addEventListener("click", () => popupBlock.classList.remove("open"));
}
);