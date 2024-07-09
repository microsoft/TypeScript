//// [tests/cases/compiler/duplicateTypeParameters3.ts] ////

//// [duplicateTypeParameters3.ts]
interface X {
x: () => <A, A>() => void;
}
 


//// [duplicateTypeParameters3.js]
