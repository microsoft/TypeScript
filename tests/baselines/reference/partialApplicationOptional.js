//// [partialApplicationOptional.ts]
const repeatAndPad = (times: number, text: string, padToLength: number = 0) =>
Array(times).fill(text).join('').padStart(padToLength, ' ');

const twice = repeatAndPad(2, ?);

twice('Double');
twice('DoublePadded', 40);


//// [partialApplicationOptional.js]
var _repeatAndPad_1;
var repeatAndPad = function (times, text, padToLength) {
    if (padToLength === void 0) { padToLength = 0; }
    return Array(times).fill(text).join('').padStart(padToLength, ' ');
};
var twice = (_repeatAndPad_1 = repeatAndPad, function (_origFuncArg1) { return _repeatAndPad_1(2, _origFuncArg1); });
twice('Double');
twice('DoublePadded', 40);
