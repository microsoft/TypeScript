// @target: esnext
// @useDefineForClassFields: true
class A extends class {} {
  constructor(public a: number) {
    console.log(super());
  }
}
