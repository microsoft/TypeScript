//// [tests/cases/compiler/firstMatchRegExpMatchArray.ts] ////

//// [firstMatchRegExpMatchArray.ts]
const match = ''.match(/ /)

if (match !== null) {
    const foo: string = match[0]
    const bar: string = match[1]
}


//// [firstMatchRegExpMatchArray.js]
const match = ''.match(/ /);
if (match !== null) {
    const foo = match[0];
    const bar = match[1];
}
