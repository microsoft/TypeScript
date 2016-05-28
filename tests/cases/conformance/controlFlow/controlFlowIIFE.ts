// @strictNullChecks: true

declare function getStringOrNumber(): string | number;

function f1() {
    let x = getStringOrNumber();
    if (typeof x === "string") {
        let n = function() {
            return x.length;
        }();
    }
}

function f2() {
    let x = getStringOrNumber();
    if (typeof x === "string") {
        let n = (function() {
            return x.length;
        })();
    }
}

function f3() {
    let x = getStringOrNumber();
    let y: number;
    if (typeof x === "string") {
        let n = (z => x.length + y + z)(y = 1);
    }
}

// Repros from #8381

let maybeNumber: number | undefined;
(function () {
    maybeNumber = 1;
})();
maybeNumber++;
if (maybeNumber !== undefined) {
    maybeNumber++;
}

let test: string | undefined;
if (!test) {
    throw new Error('Test is not defined');
}
(() => {
    test.slice(1); // No error
})();