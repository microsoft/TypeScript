// @target: *,-es3
// @strict: true
// @noTypesAndSymbols: true

// GH#34952
class Base { method?() {} }
class Derived extends Base {
    method1() { return super.method?.(); }
    method2() { return super["method"]?.(); }
}