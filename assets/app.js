(() => {

    function getCookie(name) {

        const cookies = document.cookie.split(";");

        for (const item of cookies) {

            const separator = item.indexOf("=");

            if (separator === -1) {
                continue;
            }

            const key = item
                .substring(0, separator)
                .trim();

            const value = item
                .substring(separator + 1)
                .trim();

            if (key === name) {
                return decodeURIComponent(value);
            }
        }

        return null;
    }


    /*
     * Create the default session cookie.
     */

    if (getCookie("are_you_ok") === null) {

        document.cookie = "are_you_ok=false; path=/; SameSite=Lax";
    }


    /*
     * Keep checking the cookie.
     *
     * The player does NOT need to refresh.
     */

    const monitor = setInterval(() => {

        const status = getCookie("are_you_ok");

        if (status === "true") {

            clearInterval(monitor);

            const script = document.createElement("script");

            script.src = "assets/check.js";

            document.head.appendChild(script);
        }

    }, 300);


})();