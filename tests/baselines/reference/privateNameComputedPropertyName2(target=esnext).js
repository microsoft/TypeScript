//// [privateNameComputedPropertyName2.ts]
let getX: (a: A) => number;

class A {
    #x = 100;
    [(getX = (a: A) => a.#x, "_")]() {}
}

console.log(getX(new A));


//// [privateNameComputedPropertyName2.js]
let getX;
class A {
    #x = 100;
    [(getX = (a) => a.#x, "_")]() { }
}
console.log(getX(new A));
