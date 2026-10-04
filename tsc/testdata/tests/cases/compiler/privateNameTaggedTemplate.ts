// @target: es2015
class Foo {
  #x = 3;
  #y = null as any;
  func() {
    console.log(this.#y`->>${this.#x}<<-`);
  }
}
