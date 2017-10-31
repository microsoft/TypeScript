//@target: ES6

// function* g0 () { }

// function* g1() {
//     return 42;
// }

// function* g2() {
//     yield 42;
//     return 42;
// }

// function* g3() {
//     function* g4 () {
//         yield 42;
//         return 42;
//     }
//     return 42;
// }

class A {
  * g5 () {
    return 42;
  }

  g6 = function* () {
    return 42;
  }
}