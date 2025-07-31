// @strict: true
// @target: esnext

declare function getNum(): Promise<number>;
declare function getStr(): Promise<string>;
declare function useTuple(tuple: [number, string]): void;
const p1 = Promise.resolve([]).then(() => Promise.all([getNum(), getStr()])).then(useTuple);

const p2 = Promise.resolve([]).then(()=> {
    return Promise.all([0, ""]);
})
const p3: Promise<[number, string]> = p2;
