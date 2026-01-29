//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsClassLeadingOptional.ts] ////

//// [bar.js]
export class Z {
    f(x = 1, y) {
        return [x, y];
    }
}

//// [bar.js]
export class Z {
    f(x = 1, y) {
        return [x, y];
    }
}


//// [bar.d.ts]
export class Z {
    f(x: number, y: any): any[];
}
