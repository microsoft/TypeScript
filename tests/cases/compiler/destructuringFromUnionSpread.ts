interface A { a: string }
interface B { b: number }

function foo(x: A | B) {
    const { a } = { ...x } // no error?! 
    // const a: string | undefined
    a?.toUpperCase();
}

const x = { a: 1, b: 2 }
foo(x); // a.toUpperCase is not a function, oops
