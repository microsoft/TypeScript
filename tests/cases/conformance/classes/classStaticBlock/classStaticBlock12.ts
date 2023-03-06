// @useDefineForClassFields: false
// @target: es2015

class C {
  static #x = 1;
  
  static {
    C.#x;
  }
}
