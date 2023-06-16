// <select name="Language" id="lang-select">
import { swapOpt } from "./colorThemes";

const LanguageOptions: string[] = [
    "<option value='EN'>English</option>",
    "<option value='FR'>Français</option>",
    "<option value='DE'>Deutsch</option>",
    "<option value='ES'>Español</option>",
    "<option value='KR'>Korean</option>"
];

export function setLanguageOptions(opt: string): void {
    switch (opt) {
        default:
        case 'EN':
            break;
        case 'FR':
            swapOpt(LanguageOptions, 0, 1);
            break;
        case 'DE':
            swapOpt(LanguageOptions, 0, 2);
            break;
        case 'ES':
            swapOpt(LanguageOptions, 0, 3);
            break;
        case 'KR':
            swapOpt(LanguageOptions, 0, 4);
            break;
    }
    localStorage.setItem("LanguageOption", LanguageOptions.join(''));
    let LanguageOptionsStored: string = localStorage.getItem("LanguageOption")!;
    document.querySelector("#lang-select")!.innerHTML = LanguageOptionsStored;
}