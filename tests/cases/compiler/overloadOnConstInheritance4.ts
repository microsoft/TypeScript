interface I {
    x1(a: number, callback: (x: 'hi') => number);
}
class C implements I {
    x1(a: number, callback: (x: 'hi') => number);
    x1(a: number, callback: (x: 'hi') => number) {
    }
}
