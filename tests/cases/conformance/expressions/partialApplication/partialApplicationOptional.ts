const repeatAndPad = (times: number, text: string, padToLength: number = 0) =>
Array(times).fill(text).join('').padStart(padToLength, ' ');

const twice = repeatAndPad(2, ?);

twice('Double');
twice('DoublePadded', 40);
