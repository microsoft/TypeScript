// @declaration: true
interface A {
    b: B
}

interface B {
    a: A
}
export {A, B}