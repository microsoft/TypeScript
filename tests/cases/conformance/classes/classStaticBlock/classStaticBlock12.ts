// @useDefineForClassFields: false

class C {
  static #x = 1;
  
  static {
    C.#x;
  }
}
