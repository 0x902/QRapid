const resultContainer = document.querySelector(".results-list");
var lastResult,
    countResults = 0;

function onScanSuccess(decodedText, decodedResult) {
    if (decodedText !== lastResult) {
        ++countResults;
        lastResult = decodedText;
        // Handle on success condition with the decoded message.
        resultContainer.innerHTML += `
        <li>
                        <div class="result-url-container">
                            <span class="result-count">${countResults}</span>
                            <a href="${decodedText}">${decodedText}</a>
                        </div>
                        <div class="result-action">
                            <button class="btn-secondary">
                                <img
                                    class="icon"
                                    src="assets/copy.png"
                                    alt=""
                                />
                            </button>
                            <button class="btn-secondary">
                                <img
                                    class="icon"
                                    src="assets/share.png"
                                    alt=""
                                />
                            </button>
                            <button class="btn-secondary">
                                <img
                                    class="icon"
                                    src="assets/visit.png"
                                    alt=""
                                />
                            </button>
                        </div>
                    </li>
        `;
    }
}

var html5QrcodeScanner = new Html5QrcodeScanner("qr-reader", {
    fps: 10,
    qrbox: 250,
});
html5QrcodeScanner.render(onScanSuccess);
