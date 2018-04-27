//// [operatorErrorsDetectedByNarrowingMessage.ts]
const enum Keys {
    Tab = 10,
    Shift = 13
}

function enumType() {
    let key: Keys;

    if (key === Keys.Tab) {
        return;
    }

    if (key === Keys.Tab || key === Keys.Shift) {
        return;
    }
}


function unionType() {
    let x!: string | number;
    let y!: string | number;
    if (typeof x === 'number') {
        return;
    }
    if (typeof y === 'string') {
        return;
    }
    return x === y;
}

interface Left {
    kind: 'left'
    data: number;
}

interface Right {
    kind: 'right'
    data: string;
}

function discriminatedType() {
    let x!: Left;
    let y!: Left | Right;
    if (y.kind === 'left') {
        return;
    }
    return x.data === y.data;
}


function booleanType(bar: boolean) {
    if (bar === true) {
        return "true";
    }
    if (bar === true) {
        return "false";
    }

    const f: boolean = false;
    if (f === true) {
        return "false";
    }
}


//// [operatorErrorsDetectedByNarrowingMessage.js]
function enumType() {
    var key;
    if (key === 10 /* Tab */) {
        return;
    }
    if (key === 10 /* Tab */ || key === 13 /* Shift */) {
        return;
    }
}
function unionType() {
    var x;
    var y;
    if (typeof x === 'number') {
        return;
    }
    if (typeof y === 'string') {
        return;
    }
    return x === y;
}
function discriminatedType() {
    var x;
    var y;
    if (y.kind === 'left') {
        return;
    }
    return x.data === y.data;
}
function booleanType(bar) {
    if (bar === true) {
        return "true";
    }
    if (bar === true) {
        return "false";
    }
    var f = false;
    if (f === true) {
        return "false";
    }
}
