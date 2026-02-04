// @target: es2015
// @strict: false
interface I {
    [index: string]: { prop }
}
class A implements I {
    [index: string]: { prop }
}