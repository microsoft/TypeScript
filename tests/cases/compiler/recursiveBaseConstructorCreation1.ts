class C1 {
public func(param: C2): any { }
}
class C2 extends C1 { }
var x = new C2(); // Valid
