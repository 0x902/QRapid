const resultsListEl = document.querySelector(".results-list");
const resultsContainerEl = document.querySelector(".results-container");
let beat = new Audio("assets/beep.mp3");

var lastResult,
    countResults = 0;

function onScanSuccess(decodedText, decodedResult) {
    if (decodedText !== lastResult) {
        beat.play();
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
        addListeners();
    }
}

function addListeners() {
    const parents = resultsListEl.querySelectorAll("li");
    parents.forEach((child) => {
        const actionBtns = child.querySelectorAll(".result-action img");
        actionBtns.forEach((btn) => {
            btn.addEventListener("click", () => {
                datasetValue = formatUrl(
                    btn.parentElement.parentElement.dataset.value
                );
                if (btn.id == "btn-copy") {
                    navigator.clipboard
                        .writeText(datasetValue)
                        .then(() => {
                            alert("successfully copied to clipboard!");
                        })
                        .catch(() => {
                            alert("Error! Couldn't copy :(");
                        });
                } else if (btn.id == "btn-share") {
                    const data = {
                        title: "QRapid - Scan QR",
                        url: "https://qrapid.netlify.app",
                        text: datasetValue,
                    };
                    navigator.share(data);
                } else if (btn.id == "btn-visit") {
                    window.open(datasetValue, "_blank");
                }
            });
        });
    });
}

var html5QrcodeScanner = new Html5QrcodeScanner("qr-reader", {
    fps: 10,
    qrbox: 250,
});
html5QrcodeScanner.render(onScanSuccess);
