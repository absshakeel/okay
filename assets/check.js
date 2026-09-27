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

    const BANNER_ID = "okay-flag-banner";

    /* Re-running this file must never stack banners. */
    if (document.getElementById(BANNER_ID)) {
        return;
    }

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

    /*
     * A payload that decodes to junk is just as broken as one that throws,
     * so complain loudly instead of painting garbage across the page.
     */

    if (!/^FLAG\{[\x20-\x7e]+\}$/.test(flag)) {

        console.error("check.js: payload decoded to junk:", JSON.stringify(flag));

        return;
    }

    const banner = document.createElement("div");

    banner.id = BANNER_ID;

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

    (document.body || document.documentElement).appendChild(banner);

})();