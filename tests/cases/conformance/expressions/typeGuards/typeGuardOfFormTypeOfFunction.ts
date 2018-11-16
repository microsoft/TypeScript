
function f1(x: any) {
    if (typeof x === "function") {
        x;  // any
    }
}

function f2(x: unknown) {
    if (typeof x === "function") {
        x;  // Function
    }
}

function f3(x: {}) {
    if (typeof x === "function") {
        x;  // Function
    }
}

function f4<T>(x: T) {
    if (typeof x === "function") {
        x;  // T & Function
    }
}

function f5(x: { s: string }) {
    if (typeof x === "function") {
        x;  // never
    }
}

function f6(x: () => string) {
    if (typeof x === "function") {
        x;  // () => string
    }
}

function f10(x: string | (() => string)) {
    if (typeof x === "function") {
        x;  // () => string
    }
    else {
        x;  // string
    }
}

function f11(x: { s: string } | (() => string)) {
    if (typeof x === "function") {
        x;  // () => string
    }
    else {
        x;  // { s: string }
    }
}

function f12(x: { s: string } | { n: number }) {
    if (typeof x === "function") {
        x;  // never
    }
    else {
        x;  // { s: string } | { n: number }
    }
}

// Repro from #18238

function f100<T, K extends keyof T>(obj: T, keys: K[]) : void {
    for (const k of keys) {
        const item = obj[k];
        if (typeof item == 'function')
            item.call(obj);
    }
}
