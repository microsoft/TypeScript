//// [emitClassDeclarationWithExport.ts]
export class C {
    foo() { }
}

export default class D {
    bar() { }
}

//// [emitClassDeclarationWithExport.js]
export class C {
    constructor() {
    }
    foo() {
    }
}
export default class D {
    constructor() {
    }
    bar() {
    }
}
module.exports = D;
