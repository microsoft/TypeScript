//// [arrayFlat.ts]
const expected1: string[][] = [[[""]]].flat();

const expected2: string[][][] = [[[""]]].flat(0);
const expected3: string[][] = [[[""]]].flat(1);
const expected4: string[] = [[[""]]].flat(2);
const expected5: string[] = [[[""]]].flat(3);

let [actual6] = [[[""]]].flat(undefined as number);
const expected6: string[][] | string[] | string = actual6;
actual6 = undefined as string[][] | string[] | string;

// #24579 and #29604

let [actual7] = [[""], [1]].flat();
const expected7: string | number = actual7;
actual7 = undefined as string | number;
const f: any extends typeof actual7 ? true : false = false;


//// [arrayFlat.js]
var expected1 = [[[""]]].flat();
var expected2 = [[[""]]].flat(0);
var expected3 = [[[""]]].flat(1);
var expected4 = [[[""]]].flat(2);
var expected5 = [[[""]]].flat(3);
var actual6 = [[[""]]].flat(undefined)[0];
var expected6 = actual6;
actual6 = undefined;
// #24579 and #29604
var actual7 = [[""], [1]].flat()[0];
var expected7 = actual7;
actual7 = undefined;
var f = false;
