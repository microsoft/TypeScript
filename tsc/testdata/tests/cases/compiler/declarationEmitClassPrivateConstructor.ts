// @target: es5, es2015
// @module: commonjs
// @declaration: true

interface PrivateInterface {
}

export class ExportedClass1 {
    private constructor(data: PrivateInterface) { }
}

export class ExportedClass2 {
    private constructor(private data: PrivateInterface) { }
}

export class ExportedClass3 {
    private constructor(private data: PrivateInterface, private n: number) { }
}

export class ExportedClass4 {
    private constructor(private data: PrivateInterface, public n:number) { }
}