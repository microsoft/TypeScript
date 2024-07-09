// ==ORIGINAL==

const myObj: { member(x: number, y: string): void } = {
    member: /*[#|*/(x, y) => x + y/*|]*/,
}

// ==SCOPE::Extract to constant in enclosing scope==
const newLocal = (x: number, y: string): string => x + y;
const myObj: { member(x: number, y: string): void } = {
    member: /*RENAME*/newLocal,
}
