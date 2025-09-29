// @strict: true
// @noEmit: true
// @target: esnext

function f1() {
    if (!!true) {
        return { valid: true }
    }
    return f2()
}

declare const f2: () => { valid: boolean, msg?: undefined }

f1().msg

// Repro from https://github.com/microsoft/typescript-go/issues/1742

function validate() {
    if(Math.random() > 0.5) {
        return utilValidate();
    }
    return { valid: true };
};


declare function utilValidate(): {
    valid: boolean;
    msg?: undefined;
} | {
    valid: boolean;
    msg: string;
}

validate().msg; // Error in TSGO

// https://github.com/microsoft/typescript-go/issues/1761

function normalise_trace_logs([log]: any[]) {
	let normalised = [];
    if (typeof log === "string" && log.includes("%c")) {
        normalised.push({ log, highlighted: log.includes("foo") });
    } else {
        normalised.push({ log });
    }
	return normalised;
}

function equal<T>(_actual: T, _expected: T): void {}

equal(normalise_trace_logs([]), [
    { log: 'effect' },
    { log: '$derived', highlighted: true },
    { log: 'double', highlighted: false },
    { log: 4 },
]);
