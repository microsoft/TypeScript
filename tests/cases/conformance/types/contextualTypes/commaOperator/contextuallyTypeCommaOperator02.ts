// @allowUnreachableCode: true
// @noImplicitAny: true

let x: (a: string) => string;

x = (100, a => {
    const b: number = a;
    return b;
});