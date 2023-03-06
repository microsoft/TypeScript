interface A { a: string }
interface B { b: number }

declare const x: A | B;
const { a } = { ...x } // error
