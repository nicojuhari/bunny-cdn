export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig();

    if (import.meta.dev || !config.public.gtagId) return;

    let script = document.createElement("script");
    script.setAttribute("defer", "");
    script.setAttribute(
        "src",
        `https://www.googletagmanager.com/gtag/js?id=${config.public.gtagId}`
    );
    document.head.appendChild(script);

    let scriptTwo = document.createElement("script");
    scriptTwo.setAttribute("defer", "");
    scriptTwo.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${config.public.gtagId}');`;

    document.head.appendChild(scriptTwo);
});
