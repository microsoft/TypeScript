// @target: es2017,esnext
// @useDefineForClassFields: true,false

const x = 1
class C {
    p = x
    constructor(x: string) { }
}
