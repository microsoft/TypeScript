var c = class A extends B { // error
}
var c2 = class extends B { // error
}
var c3 = class B extends class A { // No error
}{
}
var c4 =class extends class { // no error
}{
}
var c5 = class extends class B3 extends class C { // no error
}{
}{ }
class B {
}