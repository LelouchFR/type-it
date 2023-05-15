import { mots } from './components/words';
import './style.scss';

function getRandomWord(): string {
    return mots[Math.floor(Math.random() * mots.length)];
}

function CalculateWPM(keywords: number, time: number): number {
    return Math.round(((keywords / 5) / time));
}

function CalculateAcc(WKeystrokes: number, TKeystrokes: number): number {
    return Math.round((WKeystrokes / TKeystrokes) * 100);
}

function CalculateAWPM(WPM: number, Acc: number): number {
    return Math.ceil(WPM * Acc);
}


let WordsRight: number = 0;
let Words: number = 0;
let Keystrokes: number = 0;
let FalseKeystrokes: number = 0;
let time: number = 0;

function MainMenu(): string {
    return (`
        <section>
            <p id="word">${getRandomWord()}</p>
            <p id="Acc">Keystrokes: <span style="color: green">${Keystrokes - FalseKeystrokes}</span> / <span style="color: red">${FalseKeystrokes}</span></p>
        </section>
        <section>
            <input id="textInput" autocomplete="off" type="text" placeholder="start typing to race"/>
            <input id="resetButton" type="button" value="reset" />
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
            Words++
            if (textInput.value.replace(" ", "") === pElement.textContent) {
                WordsRight++;
            } else {
                FalseKeystrokes += textInput.value.replace(" ", "").length;
            }
            const randomWord: string = getRandomWord();
            pElement.textContent = randomWord;
            textInput.value = '';
        }
    });

    textInput.addEventListener('input', () => {
        if (Keystrokes === 1) {
            countdown();
        }
        Keystrokes++;
        AccElement.innerHTML = `Keystrokes: <span style="color: green">${Keystrokes - FalseKeystrokes}</span> / <span style="color: red">${FalseKeystrokes}</span>`;
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


document.querySelector<HTMLButtonElement>('#resetButton')!.onclick = function(): void {
    // Words = 0;
    // WordsRight = 0;
    // Keystrokes = 0;
    // time = 0;
    // MainMenu();
    // console.log("Works !");
    location.reload()
}