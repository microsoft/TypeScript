// @target: es5
// @module: commonjs
// @declaration: true

interface PrivateInterface {
}

export class ExportedClass1 {
    private constructor(public data: PrivateInterface) { }
}


export class ExportedClass2 {
    protected constructor(data: PrivateInterface) { }
}