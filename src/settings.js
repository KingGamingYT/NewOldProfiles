export const settings = {
    main: {
        showGuildTag: {
            name: "Show user guild tag",
            note: "Displays a user's guild tag under their pfp.",
            initial: true,
        },
        disableDiscrim: {
            name: "Disable discriminators",
            note: "Don't like legacy discriminators? This will always display a user's modern @ tag.",
            initial: false,
        },
        disableProfileThemes: {
            name: "Disable profile themes",
            note: "Disable a user's custom nitro profile colors.",
            initial: false,
        }
    },
    serverCategory: {
        showRoles: {
            name: "Show member roles",
            note: "When viewing a user's profile in a server, that user's roles will be visible in the user's profile details.",
            initial: true,
        },
        serverBio: {
            name: "Show server about me",
            note: "When viewing a user's profile in a server, that user's custom about me will be displayed instead of their default one.",
            initial: true,
        },
    }
};