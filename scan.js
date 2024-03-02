const resultsListEl = document.querySelector(".results-list");
const resultsContainerEl = document.querySelector(".results-container");

var lastResult,
    countResults = 0;

function onScanSuccess(decodedText, decodedResult) {
    if (decodedText !== lastResult) {
        resultsContainerEl.classList.contains("hidden-none")
            ? resultsContainerEl.classList.remove("hidden-none")
            : "";
        ++countResults;
        lastResult = decodedText;
        // Handle on success condition with the decoded message.
        resultsListEl.innerHTML += `
        <li dataset-value=${decodedText + countResults}>
                        <div class="result-url-container">
                            <span class="result-count">${countResults}</span>
                            <a href="${decodedText}">${decodedText}</a>
                        </div>
                        <div data-value="${decodedText}" class="result-action">
                            <button class="btn-secondary">
                                <img
                                    class="icon"
                                    id="btn-copy"
                                    src="assets/copy.png"
                                />
                            </button>
                            <button class="btn-secondary">
                                <img
                                    class="icon"
                                    src="assets/share.png"
                                    id="btn-share"
                                />
                            </button>
                            <button class="btn-secondary">
                                <img
                                    class="icon"
                                    src="assets/visit.png"
                                    id="btn-visit"
                                />
                            </button>
                        </div>
                    </li>
        `;
        document
            .querySelectorAll(
                `li[dataset-value="${decodedText + countResults}"] img`
            )
            .forEach((el) => {
                url = el.parentElement.parentElement.dataset.value;
                (url =
                    url.includes("https://") || url.includes("http://")
                        ? url
                        : `https://${url}`),
                    "_blank";
                el.addEventListener("click", () => {
                    if (el.id == "btn-copy") {
                        navigator.clipboard.writeText(url);
                        alert("copied url!");
                    } else if (el.id == "btn-visit") {
                        window.open(url);
                    } else if (el.id == "btn-share") {
                        const shareData = {
                            title: "QRapid Scan QR - Share",
                            text: "Shared from QRapid.netlify.app",
                            url: url,
                        };
                        navigator.share(shareData);
                    }
                });
            });
    }
}

var html5QrcodeScanner = new Html5QrcodeScanner("qr-reader", {
    fps: 10,
    qrbox: 250,
});
html5QrcodeScanner.render(onScanSuccess);
