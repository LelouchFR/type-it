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

const colorThemeOptions: string[] = [
    "<option value='Oceanic Teal'>Oceanic Teal</option>",
    "<option value='Cosmic Cobalt'>Cosmic Cobalt</option>",
    "<option value='Nautical Night'>Nautical Night</option>",
    "<option value='Cocoa Bean'>Cocoa Bean</option>",
    "<option value='Botanical Garden'>Botanical Garden</option>",
    "<option value='Deep Amethyst'>Deep Amethyst</option>",
    "<option value='Muted Teal'>Muted Teal</option>",
    "<option value='Warm Spice'>Warm Spice</option>",
    "<option value='Heavy Umber'>Heavy Umber</option>",
    "<option value='Dreamy Lavender'>Dreamy Lavender</option>",
    "<option value='Earthen Haze'>Earthen Haze</option>"
];

const colorThemeSelect: HTMLSelectElement = document.querySelector('#color-theme')!;

colorThemeSelect.addEventListener('change', () => {
    const selectedTheme: string = colorThemeSelect.value;
    setColors(selectedTheme);
    setOptions(selectedTheme);
});

function setColors(selectedTheme: string): void {
    const colorTheme: ColorTheme = colorThemes[selectedTheme];
    if (colorTheme) {
        let colorThemeStored: string = JSON.stringify(colorTheme);
        localStorage.setItem("colorTheme", colorThemeStored);
        const { primaryColor, secondaryColor } = colorTheme;
        document.documentElement.style.setProperty('--primary-color', primaryColor);
        document.documentElement.style.setProperty('--secondary-color', secondaryColor);
    }
}


function setOptions(opt: string): void {
    switch (opt) {
        case 'Oceanic Teal':
            break;
        case 'Cosmic Cobalt':
            swapOpt(0, 1);
            break;
        case 'Nautical Night':
            swapOpt(0, 2);
            break;
        case 'Cocoa Bean':
            swapOpt(0, 3);
            break;
        case 'Botanical Garden':
            swapOpt(0, 4);
            break;
        case 'Deep Amethyst':
            swapOpt(0, 5);
            break;
        case 'Muted Teal':
            swapOpt(0, 6);
            break;
        case 'Warm Spice':
            swapOpt(0, 7);
            break;
        case 'Heavy Umber':
            swapOpt(0, 8);
            break;
        case 'Dreamy Lavender':
            swapOpt(0, 9);
            break;
        case 'Earthen Haze':
            swapOpt(0, 10);
            break;
        default:
            break;
    }
    localStorage.setItem("colorThemeOption", colorThemeOptions.join(''));
}

function swapOpt(a: number, b: number): void {
    let temp: string = colorThemeOptions[a];
    colorThemeOptions[a] = colorThemeOptions[b];
    colorThemeOptions[b] = temp;
}

export function setTheme(): void {
    if (localStorage.getItem("colorTheme") && localStorage.getItem("colorThemeOption")) {
        let colorThemeOptionStorage: string = localStorage.getItem("colorThemeOption")!;
        colorThemeSelect.innerHTML = colorThemeOptionStorage;

        let colorThemeStorage: ColorTheme = JSON.parse(localStorage.getItem("colorTheme")!);
        document.documentElement.style.setProperty('--primary-color', colorThemeStorage.primaryColor);
        document.documentElement.style.setProperty('--secondary-color', colorThemeStorage.secondaryColor);
    } else {
        document.documentElement.style.setProperty('--primary-color', '#19535f');
        document.documentElement.style.setProperty('--secondary-color', '#0a7a75');
        setOptions('Oceanic Teal');
    }
}