interface I<T> { }
class Y<T> {}
class X<T> {
    p1: () => X;
}
var a: X<number>;

class X2<T> {
    p2: { [idx: number]: X2 } 
}
var a2: X2<number>;

class X3<T> {
    p3: X3[]
}
var a3: X3<number>;

class X4<T> {
    p4: I<X4>
}
var a4: X4<number>;

class X5<T> {
    p5: X5
}
var a5: X5<number>;

class X6<T> {
    p6: () => Y;
}
var a6: X6<number>;

class X7<T> {
    p7: { [idx: number]: Y } 
}
var a7: X7<number>;

class X8<T> {
    p8: Y[]
}
var a8: X8<number>;

class X9<T> {
    p9: I<Y>
}
var a9: X9<number>;

class X10<T> {
    pa: Y
}
var a10: X10<number>;

 
