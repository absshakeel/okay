(() => {

    const COOKIE = "are_you_ok";
    const KEY = "are_you_ok";
    const BUILD = "3";


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
     * Accept every reasonable way of spelling "on", because people set this
     * by hand: true, TRUE, "true", 'true', 1, yes.
     */

    function isUnlocked(raw) {

        if (raw === null || raw === undefined) {
            return false;
        }

        const value = String(raw)
            .trim()
            .replace(/^["']+/, "")
            .replace(/["']+$/, "")
            .toLowerCase();

        return value === "true" || value === "1" || value === "yes";
    }


    /*
     * Three sources, one question: has the system been cleared?
     *
     * The cookie is the intended way in, but storage is honoured too so a
     * blocked or path-scoped cookie can never strand somebody on the
     * "verification in progress" screen with no way forward.
     */

    function read(key) {

        try {
            return window.sessionStorage.getItem(key);
        } catch (error) {
            return null;
        }
    }

    function readLocal(key) {

        try {
            return window.localStorage.getItem(key);
        } catch (error) {
            return null;
        }
    }

    function isCleared() {

        return isUnlocked(getCookie(COOKIE))
            || isUnlocked(read(KEY))
            || isUnlocked(readLocal(KEY));
    }


    /*
     * Create the default session cookie, and mirror it into storage so the
     * three sources can never drift apart.
     */

    function remember(value) {

        document.cookie = COOKIE + "=" + value + "; path=/; SameSite=Lax";

        try {
            window.sessionStorage.setItem(KEY, value);
            window.localStorage.setItem(KEY, value);
        } catch (error) {
            /* private mode: the cookie still carries the state */
        }
    }


    /*
     * Pull in the payload. The build stamp and timestamp force a real network
     * fetch, so a stale cached copy of check.js can never be what runs here.
     */

    let loading = false;

    function reveal() {

        if (loading) {
            return;
        }

        loading = true;

        const script = document.createElement("script");

        script.src = "assets/check.js?v=" + BUILD + "&t=" + Date.now();

        script.onerror = () => {
            loading = false;
            setTimeout(reveal, 400);
        };

        document.head.appendChild(script);
    }


    function tick() {

        if (!isCleared()) {
            return;
        }

        clearInterval(monitor);

        reveal();
    }


    if (getCookie(COOKIE) === null && read(KEY) === null && readLocal(KEY) === null) {
        remember("false");
    }


    /*
     * Check straight away, then keep checking: the player does NOT need to
     * refresh, and does not need to get the order of things right.
     */

    const monitor = setInterval(tick, 300);

    tick();


    /*
     * Console shortcut, for anyone who would rather not dig through the
     * devtools cookie editor:  unlockOkay()
     */

    window.unlockOkay = () => {

        remember("true");

        clearInterval(monitor);

        reveal();
    };

})();