// Repro from #17166
function f<T, K extends keyof T>(obj: T, k: K, value: T[K]): void {
    for (let key in obj) {
        k = key // error, keyof T =/=> K
        value = obj[key]; // error, T[keyof T] =/=> T[K]
    }
}

