const isValidUrl = (urlString) => {
    var urlPattern = new RegExp(
        "^(https?:\\/\\/)?" + // validate protocol
            "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
            "((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
            "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
            "(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
            "(\\#[-a-z\\d_]*)?$",
        "i"
    ); // validate fragment locator
    return !!urlPattern.test(urlString);
};

function isValidHex(hexCode) {
    // Regular expression pattern for a valid hex code
    var pattern = /#[0-9a-f]{6}|#[0-9a-f]{3}/gi;
    return pattern.test(hexCode);
}

function formatUrl(url) {
    url =
        url.includes("https://") || url.includes("http:??")
            ? url
            : `https://${url}`;
    return url;
}

function generateQR(
    qrCodeContainer,
    url,
    foregroundColor = "#000",
    backgroundColor = "#fff"
) {
    qrCodeContainer.innerHTML = "";
    qrcode = new QRCode(qrCodeContainer, {
        text: url,
        width: 500,
        height: 500,
        colorDark: foregroundColor,
        colorLight: backgroundColor,
        correctLevel: QRCode.CorrectLevel.H,
    });
}

function addDownloadListener() {
    document
        .querySelector(".btn-download")
        .addEventListener("click", async () => {
            const qrImageSrc = document.querySelector(
                ".qrcode-container img"
            ).src;

            // Fetch the image
            const response = await fetch(qrImageSrc);
            const blob = await response.blob();

            // Create a temporary anchor element
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = `QRapid-${siteUrl
                .toLowerCase()
                .replaceAll(" ", "")}.png`;

            // Simulate click on the anchor element to trigger download
            document.body.appendChild(link);
            link.click();

            // Clean up
            document.body.removeChild(link);
            URL.revokeObjectURL(link.href);
        });
}
