// @target: esnext
// @useDefineForClassFields: true
// @Filename: a.d.ts
declare class A {
    /**@accessor*/ p: number
}
// @Filename: b.ts
class B extends A {
    get p() { return 1 }
    set p(value) { }
}
