// @lib: es2019

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
