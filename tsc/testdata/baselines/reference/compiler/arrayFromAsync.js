//// [tests/cases/compiler/arrayFromAsync.ts] ////

//// [arrayFromAsync.ts]
export { };
async function * asyncGen (n) {
    for (let i = 0; i < n; i++)
      yield i * 2;
  }

function * genPromises (n) {
    for (let i = 0; i < n; i++) {
        yield Promise.resolve(i * 2);
    }
}

const arrLike = {
    0: Promise.resolve(0),
    1: Promise.resolve(2),
    2: Promise.resolve(4),
    3: Promise.resolve(6),
    length: 4,
}

const arr : number[] = [];
for await (const v of asyncGen(4)) {
  arr.push(v);
}

const sameArr1 = await Array.fromAsync(arrLike);
const sameArr2 = await Array.fromAsync([Promise.resolve(0), Promise.resolve(2), Promise.resolve(4), Promise.resolve(6)]);
const sameArr3 = await Array.fromAsync(genPromises(4));
const sameArr4 = await Array.fromAsync(asyncGen(4));

function Data (n) {}
Data.fromAsync = Array.fromAsync;
const sameArr5 = await Data.fromAsync(asyncGen(4));

const mapArr1 = await Array.fromAsync(asyncGen(4), v => v ** 2);
const mapArr2 = await Array.fromAsync([0,2,4,6], v => Promise.resolve(v ** 2));
const mapArr3 = await Array.fromAsync([0,2,4,6], v => v ** 2);

const err = new Error;
const badIterable = { [Symbol.iterator] () { throw err; } };
// This returns a promise that will reject with `err`.
const badArray = await Array.fromAsync(badIterable);

const withIndexResult = await Array.fromAsync(["a", "b"], (str, index) => ({ index, str }));


//// [arrayFromAsync.js]
async function* asyncGen(n) {
    for (let i = 0; i < n; i++)
        yield i * 2;
}
function* genPromises(n) {
    for (let i = 0; i < n; i++) {
        yield Promise.resolve(i * 2);
    }
}
const arrLike = {
    0: Promise.resolve(0),
    1: Promise.resolve(2),
    2: Promise.resolve(4),
    3: Promise.resolve(6),
    length: 4,
};
const arr = [];
for await (const v of asyncGen(4)) {
    arr.push(v);
}
const sameArr1 = await Array.fromAsync(arrLike);
const sameArr2 = await Array.fromAsync([Promise.resolve(0), Promise.resolve(2), Promise.resolve(4), Promise.resolve(6)]);
const sameArr3 = await Array.fromAsync(genPromises(4));
const sameArr4 = await Array.fromAsync(asyncGen(4));
function Data(n) { }
Data.fromAsync = Array.fromAsync;
const sameArr5 = await Data.fromAsync(asyncGen(4));
const mapArr1 = await Array.fromAsync(asyncGen(4), v => v ** 2);
const mapArr2 = await Array.fromAsync([0, 2, 4, 6], v => Promise.resolve(v ** 2));
const mapArr3 = await Array.fromAsync([0, 2, 4, 6], v => v ** 2);
const err = new Error;
const badIterable = { [Symbol.iterator]() { throw err; } };
// This returns a promise that will reject with `err`.
const badArray = await Array.fromAsync(badIterable);
const withIndexResult = await Array.fromAsync(["a", "b"], (str, index) => ({ index, str }));
export {};
