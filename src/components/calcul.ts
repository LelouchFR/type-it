function CalculateWPM(keywords: number, time: number): number {
    return Math.round(((keywords / 5) / time));
}

function CalculateAcc(WKeystrokes: number, TKeystrokes: number): number {
    return Math.round((WKeystrokes / TKeystrokes) * 100);
}

function CalculateAWPM(WPM: number, Acc: number): number {
    return Math.ceil(WPM * Acc);
}

export { CalculateWPM, CalculateAcc, CalculateAWPM };