export default defineAppConfig({
    ui: {
        colors: {
            primary: "blue",
            neutral: "gray",
            secondary: "green",
        },
        modal: {
            slots: {
                close: "cursor-pointer",
            },
        },
        icons: {
            close: "i-ph-x-bold",
        },
        button: {
            defaultVariants: {
                color: "primary",
                variant: "solid",
                size: "xl",
            },
        },
        input: {
            slots: {
                root: "w-full",
            },
        },
        textarea: {
            slots: {
                root: "w-full",
            },
        },
    },

    appDescription: "Better UI for Bunny CDN",
    appName: "Bunny CDN",
    domainName: "https://bunny-cdn.netlify.app/",
    metaTitle: "Better UI for Bunny CDN",
    metaDescription: "Simple Bunny CDN Asset Management Upload, Organize, and Share. Take Control of Your Bunny.net CDN Assets from a sinlge UI.",
});
