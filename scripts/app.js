const elements = {
    urlInput: document.querySelector(".url-input"),
    qrEl: document.querySelector(".qrcode-container"),
    foreGroundColorEl: document.querySelector(".foreground-input"),
    backgroundColorEl: document.querySelector(".background-input"),
    logoInputEl: document.querySelector(".logo-input"),
    alertUrlEl: document.querySelector(".alert-url"),
    alertColorsEl: document.querySelector(".alert-colors"),
    generateBtnEl: document.querySelector(".btn-generate"),
    ulrPreviewEl: document.querySelector(".url"),
    themesEl: document.querySelectorAll(".theme"),
};

let foreGroundColor = elements.foreGroundColorEl.value;
let backgroundColor = elements.backgroundColorEl.value;
let siteUrl = "";
let validURl = false;
let validColors = true;

function updateColors() {
    if (isValidHex(foreGroundColor) && isValidHex(backgroundColor)) {
        elements.foreGroundColorEl.style.borderRight = `60px solid ${foreGroundColor}`;
        elements.backgroundColorEl.style.borderRight = `60px solid ${backgroundColor}`;
        validColors = true;
        elements.alertColorsEl.textContent = ":: valid colors";
        elements.alertColorsEl.classList.add("alert-valid");
        elements.alertColorsEl.classList.remove("alert-invalid");
    } else {
        elements.foreGroundColorEl.style.borderRight = "none";
        elements.backgroundColorEl.style.borderRight = "none";
        validColors = false;
        elements.alertColorsEl.textContent = ":: invalid colors";
        elements.alertColorsEl.classList.remove("alert-valid");
        elements.alertColorsEl.classList.add("alert-invalid");
    }
}

elements.urlInput.addEventListener("input", () => {
    elements.alertUrlEl.classList.remove("hidden-none");
    if (isValidUrl(elements.urlInput.value)) {
        elements.alertUrlEl.textContent = ":: valid url";
        elements.alertUrlEl.classList.add("alert-valid");
        elements.alertUrlEl.classList.remove("alert-invalid");
        siteUrl = elements.urlInput.value;
        validURl = true;
    } else {
        elements.alertUrlEl.textContent = ":: invalid url";
        elements.alertUrlEl.classList.remove("alert-valid");
        elements.alertUrlEl.classList.add("alert-invalid");
        siteUrl = "";
        validURl = false;
    }
});

elements.foreGroundColorEl.addEventListener("input", () => {
    foreGroundColor = elements.foreGroundColorEl.value;
    elements.alertColorsEl.classList.remove("hidden-none");
    updateColors();
});

elements.backgroundColorEl.addEventListener("input", () => {
    backgroundColor = elements.backgroundColorEl.value;
    elements.alertColorsEl.classList.remove("hidden-none");
    updateColors();
});

elements.generateBtnEl.addEventListener("click", () => {
    if (validURl && validColors) {
        generateQR(elements.qrEl, siteUrl, foreGroundColor, backgroundColor);
        document.querySelector(".qrcode-container img").style.backgroundColor =
            backgroundColor;
        document.querySelector(
            ".qrcode-container canvas"
        ).style.backgroundColor = backgroundColor;
        elements.ulrPreviewEl.innerHTML = `<a class="url" target="_blank" href="https://${siteUrl}">${siteUrl} &rarr;</a>`;
    }
});

elements.themesEl.forEach((element) => {
    element.addEventListener("click", () => {
        foreGroundColor =
            element.getElementsByTagName("span")[0].style.backgroundColor;
        backgroundColor =
            element.getElementsByTagName("span")[1].style.backgroundColor;
        elements.foreGroundColorEl.value = foreGroundColor;
        elements.backgroundColorEl.value = backgroundColor;
        elements.foreGroundColorEl.style.borderRight = `60px solid ${foreGroundColor}`;
        elements.backgroundColorEl.style.borderRight = `60px solid ${backgroundColor}`;
    });
});

addDownloadListener();

// elements.logoInputEl.onchange = () => {
//     let reader = new FileReader();
//     reader.readAsDataURL(elements.logoInputEl.files[0]);
//     reader.onload = () => {
//         clientLogo = reader.result;
//     };
// };
