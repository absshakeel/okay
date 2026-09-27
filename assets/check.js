(() => {

    /*
     * These chunks must concatenate into a *valid* base64 string.
     * The joined length has to be a multiple of 4, and the only "="
     * allowed is the padding at the very end.
     */
    const parts = [
        "RkxBR3tD",
        "T09LSUVf",
        "SVNfTklD",
        "RV9UUklD",
        "S30="
    ];

    let flag;

    try {

        flag = atob(parts.join(""));

    } catch (error) {

        /*
         * Never fail silently again: a broken payload used to abort this
         * IIFE and leave the page stuck on "verification in progress".
         */
        console.error("check.js: failed to decode payload", error);

        return;
    }

    const banner = document.createElement("div");

    banner.textContent = flag;

    banner.style.cssText = `
        position: fixed;
        top: 25px;
        left: 0;
        width: 100%;
        text-align: center;
        font-size: 48px;
        font-weight: bold;
        color: #00ff88;
        z-index: 99999;
    `;

    document.body.appendChild(banner);

})();