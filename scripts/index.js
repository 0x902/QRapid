const elements = {
    form: document.querySelector("form"),
    urlInput: document.querySelector(".url-input"),
    resultEl: document.querySelector(".result"),
    qrEl: document.querySelector(".qrcode-container"),
    alertEl: document.querySelector(".alert"),
    ulrPreviewEl: document.querySelector(".url"),
    selectFormatEl: document.querySelector(".select-format"),
};

var siteUrl = "";

elements.urlInput.addEventListener("input", () => {
    elements.urlInput.value = elements.urlInput.value.replaceAll(" ", "");

    elements.alertEl.classList.toggle(
        "hidden-none",
        isValidUrl(elements.urlInput.value)
    );
});

elements.form.addEventListener("submit", (e) => {
    e.preventDefault();

    const userInput = elements.urlInput.value.trim();
    if (isValidUrl(userInput)) {
        siteUrl = formatUrl(userInput);
        elements.ulrPreviewEl.innerHTML = `<a class="url" target="_blank" href="${siteUrl}">${siteUrl} &rarr;</a>`;
        generateQR(elements.qrEl, siteUrl, "#000", "#fff");
        elements.resultEl.classList.remove("hidden-none");
        addDownloadListener();
    }
});
