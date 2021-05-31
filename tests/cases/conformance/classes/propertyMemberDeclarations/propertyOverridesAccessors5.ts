// @target: esnext
// @useDefineForClassFields: true
class A {
    get p() { return 'oh no' }
}
class B extends A {
    constructor(public p: string) {
        super()
    }
}
