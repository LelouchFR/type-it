<h1 align="center">Type-it</h1>

<h2>How to calculate the WPMs ?</h2>

## Calculating WPM:

> WPM = ((Total Key Presses / 5) / Time in minute)

```ts
function CalculateWPM(keywords: number, time: number): number {
    return Math.round(((keywords / 5) / time));
}
```

## Caulculating Accuracy:

> Acc = (False Key Presses / Total Key Presses) * 100

```ts
function CalculateAcc(WKeystrokes: number, TKeystrokes: number): number {
    return Math.round((WKeystrokes / TKeystrokes) * 100);
}
```

## Calculating Accuracy + WPM:

> AWPM = WPM * (ACC / 100)

```ts
function CalculateAWPM(WPM: number, Acc: number): number {
    return Math.ceil(WPM * Acc);
}
```

<h2>What lagnuages can I train ?</h2>

You can train currently on 5 languages, but you can feel free to add you own language if you want :)

```ts
const wordArrays: WordArrays = {
    FR: mots,
    DE: worter,
    ES: palabras,
    KR: 단어,
    EN: words
}
```

these words are in the file [words.ts](./src/components/words.ts), where the 5 languages are exported

<h2>How are the words added ?</h2>

Using some simple algorithm:
1. Take the list
2. take the word you typed (the first one of the list) and remove it
3. slide every word to -1
4. add a new word at the end of the list

function to make the algorithm (1, 2, 3):

```ts
function wordLineGen(newWord: string): string[] {
    wordlist.push(newWord);

    for (let i: number = 0; i < wordlist.length; i++)
        wordlist[i] = wordlist[i + 1];

    wordlist.pop();

    return wordlist;
}
```

to get a random word in the language you want (4):

```ts
function getRandomWord(): string {
    const selectedArray: string[] = wordArrays[lang] || words;
    const randomIndex: number = Math.floor(Math.random() * selectedArray.length);
    return selectedArray[randomIndex];
}
```

see the full typescript code [here](./src/main.ts)

[LICENSE](./LICENSE)