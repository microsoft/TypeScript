class A<T> {
    genericVar: T
}
function B<T>() {
    // class expression can use T
    return class extends A<T> { }
}
// extends can call B
class K extends B<number>() {
    name: string;
}
var c = new K();
c.genericVar = 12;
