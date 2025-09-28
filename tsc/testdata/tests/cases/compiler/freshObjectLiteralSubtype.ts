// @strict: true
// @noEmit: true

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
