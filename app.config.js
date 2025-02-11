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

    appDescription: "Best solution for your business",
    appName: "Nuxt Starter",
    domainName: "nicojuhari.com",
    metaTitle: "Your Business Website Title",
    metaDescription: "Your business website description",
    googleSiteVerification: "xxx",
});
