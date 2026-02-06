// @stableTypeOrdering: true,false
// @noEmit: true
// @strict: true

class Message { value: string = ""; }

function takeMessageOrArray(message: Message | Message[]) { return message; }
const result1 = takeMessageOrArray(null!);

function checkType(x: string | number | boolean) {
    const t = typeof x;
    return t;
}

function mixedUnion(x: string | number[] | { a: number }) {
    return x;
}

enum Color { Red, Green, Blue }
function enumUnion(x: Color | string | string[]) {
    return x;
}

type Named = { name: string };
type Aged = { age: number };
type Person = Named & Aged;
declare const person: Person | null;
const p = person;
