<h1 align="center">Type-it</h1>

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