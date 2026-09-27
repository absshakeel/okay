(() => {

    const parts = [
        "RkxBR3t",
        "Q09PS0lF",
        "X0lTX0",
        "TklDRV9U",
        "UklDS30="
    ];

    const flag = atob(parts.join(""));

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