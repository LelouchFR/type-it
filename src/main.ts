import { words, mots, worter, palabras, 단어 } from './components/words';
import { CalculateWPM, CalculateAcc, CalculateAWPM } from './components/calcul';
import { setTheme } from './components/colorThemes';
import { setLanguageOptions } from './components/chooseLang';
import { Chart } from 'chart.js/auto';
import './style.scss';

const [RIGHT_COLOR, WRONG_COLOR]: string[] = ["#9bc53d", "#e55934"];
let [Keystrokes, FalseKeystrokes, time]: number[] = [0, 0, 0];
let [wordlist, WordSplit]: string[][] = [];
let totWpm: number[] = [];
let wrong: boolean = false;
let lang: string;

type WpmChart = Chart<"line", number[], string>;

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

// sets a random word taken from "./components/words.ts"
function getRandomWord(): string {
    const selectedArray: string[] = wordArrays[lang] || words;
    const randomIndex: number = Math.floor(Math.random() * selectedArray.length);
    return selectedArray[randomIndex];
}

// sets a new array with the selected language
document.querySelector("#lang-select")?.addEventListener("change", () => {
    lang = (document.querySelector("#lang-select") as HTMLSelectElement).value;
    localStorage.setItem("Language", lang);
    wordlist = Array.from({ length: 11 }, () => getRandomWord());
});

const language = localStorage.getItem("Language")!;
lang = language;

wordlist = Array.from({ length: 11 }, () => getRandomWord());

function MainMenu(): string {
    setTheme();
    setLanguageOptions(lang);
    
    return (`
        <section class="WordGen">
            <p id="word"><span id="firstword">${wordlist[0]}</span> ${wordlist.slice(1).join(' ')}</p>
        </section>
        <section class="InputRest">
            <input id="textInput" autocomplete="off" type="text" placeholder="start typing to race"/>
            <button id="resetButton" aria-label="Reset Button"><i class="fa-solid fa-arrows-rotate"></i></button>
            <p id="Acc">Keystrokes: <span class="GoodKeystrokes textcolored">${Keystrokes - FalseKeystrokes}</span> / <span class="FalseKeystrokes textcolored">${FalseKeystrokes}</span></p>
            <p id="timer">1:00</p>
            <p id="WPM">0 WPM</p>
            <div class="Graph"></div>
        </section>
    `);
}

document.querySelector<HTMLDivElement>('#app')!.innerHTML = MainMenu();

const textInput: HTMLInputElement = document.querySelector<HTMLInputElement>('#textInput')!;
const pElement: HTMLParagraphElement = document.querySelector<HTMLParagraphElement>('#word')!;
const pElementFirstWord: HTMLSpanElement = document.querySelector<HTMLSpanElement>('#firstword')!;
const AccElement: HTMLParagraphElement = document.querySelector<HTMLParagraphElement>('#Acc')!;
const WPM: HTMLParagraphElement = document.querySelector<HTMLParagraphElement>("#WPM")!;
const counter: HTMLParagraphElement = document.querySelector<HTMLParagraphElement>("#timer")!;

WordSplit = pElement.textContent!.trim().split(' ')[0].split('') || wordlist[0];

if (textInput) {

    // checks for keypresses (Space, Enter & Backspace)
    textInput.addEventListener('keydown', (event: KeyboardEvent) => {
        if (event.code === 'Space' || event.code === 'Enter') {
            // if answer the word is misspelled, the length of the word you wrote is converted in FalseKeystrokes
            if (textInput.value.replace(' ', '') !== pElement.textContent!.trim().split(' ')[0]) {
                FalseKeystrokes += textInput.value.replace(' ', '').length;
            }

            // places a new word in the list and takes of the first one
            wordlist = wordLineGen(getRandomWord());

            pElement.innerHTML = `<span id="firstword">${wordlist[0]}</span> ${wordlist.slice(1).join(' ')}`;
            
            // reset of some variables
            pElementFirstWord.textContent = wordlist[0];
            wrong = false;
            textInput.value = '';
            Keystrokes--;

        } else if (event.code === 'Backspace') {
            Keystrokes -= 2;
        }
    });

    // checks for every keyspresses done in the input field
    textInput.addEventListener('input', () => {
        // if first keystroke -> starts the countdown
        if (Keystrokes === 1) {
            countdown();
        }

        wrong = false;

        WordSplit = pElement.textContent!.trim().split(' ')[0].split('') || wordlist[0];

        // for each input field character, it looks if it fits with the word characters, and sets some colors (wrong / right)
        textInput.value.replace(' ', '').split('').forEach((char: string, i: number): void => {
            if (char === WordSplit[i] && !wrong) {
                pElementFirstWord.style.backgroundColor = RIGHT_COLOR;
            } else {
                pElementFirstWord.style.backgroundColor = WRONG_COLOR;
                wrong = true;
            }
        });

        Keystrokes++;
        AccElement.innerHTML = `Keystrokes: <span class="GoodKeystrokes">${Keystrokes - FalseKeystrokes}</span> / <span class="FalseKeystrokes">${FalseKeystrokes}</span>`;
    });
}

function countdown(): void {
    let seconds: number = 60;
    function tick(): void {
        if (counter) {
            seconds--;
            time += (1/60);
            counter.innerHTML = "0:" + (seconds < 10 ? "0" : "") + String(seconds);
            totWpm.push(CalculateAWPM(CalculateWPM(Keystrokes, time), (CalculateAcc(Keystrokes - FalseKeystrokes, Keystrokes) / 100)));
            if (seconds > 0) {
                setTimeout(tick, 1000);
                WPM.textContent = `${CalculateAWPM(CalculateWPM(Keystrokes, time), (CalculateAcc(Keystrokes - FalseKeystrokes, Keystrokes) / 100))} WPM`;
            } else {
                textInput.disabled = true;
                pElement.textContent = "";
                WPM.textContent = `${CalculateAWPM(CalculateWPM(Keystrokes, 1), CalculateAcc(Keystrokes - FalseKeystrokes, Keystrokes) / 100)} WPM  `;
                (document.querySelector('.InputRest') as HTMLElement).style.transform = 'translate(-50%, 10%)';
                LoadGraph();
            }
        }
    }
    tick();
}

// creating a chart by using the wpm list to show the progression your level through the minute
function LoadGraph(): void {
    document.querySelector('.Graph')!.innerHTML = `<canvas id="chart" width="200" height="100"></canvas>`;
    const ctx = document.getElementById('chart') as HTMLCanvasElement;
    // @ts-ignore
    const wpmChart: WpmChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({ length: 60 }, () => ''),
            datasets: [{
                label: 'WPM',
                data: totWpm,
                backgroundColor: 'rgba(255, 255, 255, 1)',
                borderColor: 'rgb(155, 197, 61)',
                borderWidth: 1,
            }]
        },
    });
}

// push a new word -> shifts the array -1 -> takes the first one off -> returns the new array
function wordLineGen(newWord: string): string[] {
    wordlist.push(newWord);

    for (let i: number = 0; i < wordlist.length; i++)
        wordlist[i] = wordlist[i + 1];

    wordlist.pop();

    WordSplit = pElement.textContent!.trim().split(' ')[1].split('');

    return wordlist;
}

// reset
document.querySelector<HTMLButtonElement>('#resetButton')!.onclick = function(): void {
    location.reload();
}