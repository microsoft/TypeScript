// @strict: true
// @noEmit: true
// @target: esnext
// @module: esnext

// Repro for #63981

export {};

let count: number;

function makeCallback(p: string) {
    return () => {
        count += 1;
        return p;
    };
}

count = 0;
makeCallback('x')();

let count2: number;

function makeCallback2(p: string) {
    const f = () => p;
    return () => {
        count2 += 1;
    };
}

count2 = 0;

let count3: number;

function makeCallback3(p: string) {
    return () => {
        count3 += 1;
        return p;
    };
}
