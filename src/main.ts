import { words, mots, worter, palabras, 단어 } from './components/words';
import './style.scss';

// @ts-ignore
let WordsRight: number = 0;
// @ts-ignore
let Words: number = 0;
let Keystrokes: number = 0;
let FalseKeystrokes: number = 0;
let lang: string;
let time: number = 0;

function getRandomWord(): string {
    let res: string = "";
    switch (lang) {
        case "FR":
            res = mots[Math.floor(Math.random() * mots.length)];
            break;
        case "DE":
            res = worter[Math.floor(Math.random() * worter.length)];
            break;
        case "ES":
            res = palabras[Math.floor(Math.random() * palabras.length)];
            break;
        case "KR":
            res = 단어[Math.floor(Math.random() * 단어.length)];
            break;
        case "EN":
        default:
            res = words[Math.floor(Math.random() * words.length)];
            break;
    }
    return res;
}

document.querySelector("#lang-select")?.addEventListener("change", () => {
    lang = (document.querySelector("#lang-select") as HTMLSelectElement).value;
    wordlist = Array.from({ length: 11 }, () => getRandomWord());
});

function CalculateWPM(keywords: number, time: number): number {
    return Math.round(((keywords / 5) / time));
}

function CalculateAcc(WKeystrokes: number, TKeystrokes: number): number {
    return Math.round((WKeystrokes / TKeystrokes) * 100);
}

function CalculateAWPM(WPM: number, Acc: number): number {
    return Math.ceil(WPM * Acc);
}

let wordlist: string[] = Array.from({ length: 11 }, () => getRandomWord());

function MainMenu(): string {
    return (`
        <section class="WordGen">
            <p id="word">${wordlist[0]} ${wordlist[1]} ${wordlist[2]} ${wordlist[3]} ${wordlist[4]} ${wordlist[5]} ${wordlist[6]} ${wordlist[7]} ${wordlist[8]} ${wordlist[9]} ${wordlist[10]}</p>
        </section>
        <section class="InputRest">
            <input id="textInput" autocomplete="off" type="text" placeholder="start typing to race"/>
            <button id="resetButton"><i class="fa-solid fa-arrows-rotate"></i></button>
            <p id="Acc">Keystrokes: <span id="GoodKeystrokes">${Keystrokes - FalseKeystrokes}</span> / <span id="FalseKeystrokes">${FalseKeystrokes}</span></p>
            <p id="timer">1:00</p>
            <p id="WPM">0 WPM</p>
        </section>
    `);
}

document.querySelector<HTMLDivElement>('#app')!.innerHTML = MainMenu();

const textInput: HTMLInputElement = document.querySelector<HTMLInputElement>('#textInput')!;
const pElement: HTMLParagraphElement = document.querySelector<HTMLParagraphElement>('#word')!;
const AccElement: HTMLParagraphElement = document.querySelector<HTMLParagraphElement>('#Acc')!;
let WPM: HTMLParagraphElement = document.querySelector<HTMLParagraphElement>("#WPM")!;
let counter: HTMLParagraphElement = document.querySelector<HTMLParagraphElement>("#timer")!;

if (textInput) {
    textInput.addEventListener('keydown', (event) => {
        if (event.code === 'Space') {
            Words++;
            if (textInput.value.replace(" ", "") === pElement.textContent!.trim().split(' ')[0]) {
                WordsRight++;
            } else {
                FalseKeystrokes += textInput.value.replace(" ", "").length;
            }
            wordlist = wordLineGen(getRandomWord());
            const randomWord = wordlist[10];
            pElement.textContent = `${wordlist[0]} ${wordlist[1]} ${wordlist[2]} ${wordlist[3]} ${wordlist[4]} ${wordlist[5]} ${wordlist[6]} ${wordlist[7]} ${wordlist[8]} ${wordlist[9]} ${randomWord}`;
            textInput.value = '';
        }
    });

    textInput.addEventListener('input', () => {
        if (Keystrokes === 1) {
            countdown();
        }
        Keystrokes++;
        AccElement.innerHTML = `Keystrokes: <span id="GoodKeystrokes">${Keystrokes - FalseKeystrokes}</span> / <span id="FalseKeystrokes">${FalseKeystrokes}</span>`;
    });
}

function countdown(): void {
    let seconds: number = 60;
    function tick(): void {
        if (counter) {
            seconds--;
            time += (1/60);
            counter.innerHTML = "0:" + (seconds < 10 ? "0" : "") + String(seconds);
            if (seconds > 0) {
                setTimeout(tick, 1000);
                WPM.textContent = `${CalculateAWPM(CalculateWPM(Keystrokes, time), (CalculateAcc(Keystrokes - FalseKeystrokes, Keystrokes) / 100))} WPM`;
            } else {
                textInput.disabled = true;
                WPM.textContent = `${CalculateAWPM(CalculateWPM(Keystrokes, 1), (CalculateAcc(Keystrokes - FalseKeystrokes, Keystrokes) / 100))} WPM`;
            }
        }
    }
    tick();
}

function wordLineGen(newWord: string): string[] {
    wordlist.push(newWord);

    for (let i: number = 0; i < wordlist.length; i++)
        wordlist[i] = wordlist[i + 1];

    wordlist.pop();

    return wordlist;
}

document.querySelector<HTMLButtonElement>('#resetButton')!.onclick = function(): void {
    location.reload();
}