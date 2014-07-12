//// [duplicateTypeParameters3.ts]
interface X {
x: () => <A, A>() => void;
}
 


//// [duplicateTypeParameters3.js]
