import axios from "axios";

export const redirectWithPatterns = (
    patterns: string[],
    redirectOrigin: string,
    redirectByPattern: boolean
) => {
    const redirect = () => {
        const origin = window.location.origin;
        const newHref = window.location.href.replace(origin, redirectOrigin);
        window.location.href = newHref;
    };

    const check = () => {
        const hash = window.location.hash;
        for (const pattern of patterns) {
            if (hash.includes(pattern)) {
                return true;
            }
        }
        return false;
    };

    const onLocationChange = () => {
        if (localStorage.getItem("useRedirect") != "true") return;
        // if (check() == redirectByPattern) redirect();
    };

    // при старте клиента запускаем проверку
    onLocationChange();

    // отслеживаем изменение истории
    window.addEventListener("popstate", onLocationChange);
};

export const redirectWithConfig = (
    pathToConfig: string,
    redirectOrigin: string,
    redirectByPattern: boolean
) => {
    axios.get(pathToConfig).then(
        response => {
            if (response.data)
                redirectWithPatterns(response.data, redirectOrigin, redirectByPattern);
        },
        error => console.log("ERROR on LOAD redirectWithConfig", error)
    );
};
