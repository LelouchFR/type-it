interface ColorTheme {
    primaryColor: string;
    secondaryColor: string;
}

interface ColorThemes {
    [key: string]: ColorTheme;
}

const colorThemes: ColorThemes = {
    'Oceanic Teal': { primaryColor: '#19535f', secondaryColor: '#0a7a75' },
    'Cosmic Cobalt': { primaryColor: '#3626A7', secondaryColor: '#657ED4' },
    'Nautical Night': { primaryColor: '#001524', secondaryColor: '#15616D' },
    'Cocoa Bean': { primaryColor: '#210F04', secondaryColor: '#452103' },
    'Botanical Garden': { primaryColor: '#3FA34D', secondaryColor: '#5BBA6F' },
    'Deep Amethyst': { primaryColor: '#190B28', secondaryColor: '#685762' },
    'Muted Teal': { primaryColor: '#3A606E', secondaryColor: '#607B7D' },
    'Warm Spice': { primaryColor: '#D36135', secondaryColor: '#7FB069' },
    'Heavy Umber': { primaryColor: '#191308', secondaryColor: '#322A26' },
    'Dreamy Lavender': { primaryColor: '#5d009f', secondaryColor: '#ae7fd0' },
    'Earthen Haze': { primaryColor: '#272727', secondaryColor: '#D4AA7D' },
};

export { colorThemes };