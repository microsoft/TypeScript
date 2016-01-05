// @noImplicitAny: true

let x: (a: string) => string;
let y = true;

x = y && (a => {
    const b: number = a;
    return b;
});