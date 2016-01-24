// Check that errors are reported for non-generic types with type arguments

class C { }
interface I { }
enum E { }
type T = { };
var v1: C<string>;
var v2: I<string>;
var v3: E<string>;
var v4: T<string>;

function f<U>() {
    class C { }
    interface I { }
    enum E { }
    type T = {};
    var v1: C<string>;
    var v2: I<string>;
    var v3: E<string>;
    var v4: T<string>;
    var v5: U<string>;
}
