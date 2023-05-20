import { words, mots, worter, palabras, 단어 } from './components/words';
import { CalculateWPM, CalculateAcc, CalculateAWPM } from './components/calcul';
import './style.scss';

// @ts-ignore
let [WordsRight, Words, Keystrokes, FalseKeystrokes, time]: number[] = [0, 0, 0, 0, 0];
let lang: string;
let wordlist: string[];

interface WordArrays {
    [key: string]: string[];
}

const wordArrays: WordArrays = {
    FR: mots,
    DE: worter,
    ES: palabras,
    KR: 단어,
    EN: words
}

function getRandomWord(): string {
    const selectedArray: string[] = wordArrays[lang] || words;
    const randomIndex: number = Math.floor(Math.random() * selectedArray.length);
    return selectedArray[randomIndex];
}

document.querySelector("#lang-select")?.addEventListener("change", () => {
    lang = (document.querySelector("#lang-select") as HTMLSelectElement).value;
    wordlist = Array.from({ length: 11 }, () => getRandomWord());
});

wordlist = Array.from({ length: 11 }, () => getRandomWord());

function MainMenu(): string {
    return (`
        <section class="WordGen">
            <p id="word">${wordlist.join(' ')}</p>
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
    textInput.addEventListener('keydown', (event: KeyboardEvent) => {
        if (event.code === 'Space') {
            Words++;
            if (textInput.value.replace(" ", "") === pElement.textContent!.trim().split(' ')[0]) {
                WordsRight++;
            } else {
                FalseKeystrokes += textInput.value.replace(" ", "").length;
            }
            wordlist = wordLineGen(getRandomWord());
            pElement.textContent = `${wordlist.join(' ')}`;
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