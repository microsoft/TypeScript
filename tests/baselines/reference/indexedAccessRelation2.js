//// [indexedAccessRelation2.ts]
// Repro from #17166
function f<T, K extends keyof T>(obj: T, k: K, value: T[K]): void {
    for (let key in obj) {
        k = key // error, keyof T =/=> K
        value = obj[key]; // error, T[keyof T] =/=> T[K]
    }
}



//// [indexedAccessRelation2.js]
// Repro from #17166
function f(obj, k, value) {
    for (var key in obj) {
        k = key; // error, keyof T =/=> K
        value = obj[key]; // error, T[keyof T] =/=> T[K]
    }
}
