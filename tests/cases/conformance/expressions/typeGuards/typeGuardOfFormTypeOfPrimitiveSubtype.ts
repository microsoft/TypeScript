let a: {};
let b: {toString(): string};
if (typeof a === "number") {
    let c: number = a;
}
if (typeof a === "string") {
    let c: string = a;
}
if (typeof a === "boolean") {
    let c: boolean = a;
}

if (typeof b === "number") {
    let c: number = b;
}
if (typeof b === "string") {
    let c: string = b;
}
if (typeof b === "boolean") {
    let c: boolean = b;
}
