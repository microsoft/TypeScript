//// [directDependenceBetweenTypeAliases.ts]
// It is an error for the type specified in a type alias to depend on that type alias

// A type alias directly depends on the type it aliases.
type T0 = T0
type T0_1 = T0_2
type T0_2 = T0_3
type T0_3 = T0_1

// A type reference directly depends on the referenced type and each of the type arguments, if any.
interface I<T> {}
type T1 = I<T1>

// A union type directly depends on each of the constituent types.
type T2 = T2 | string
class C<T> {}
type T2_1 = T2_1[] | number

// An array type directly depends on its element type.
type T3 = T3[]

// A tuple type directly depends on each of its element types.
type T4 = [number, T4]

// A type query directly depends on the type of the referenced entity.
var x: T5[] = []
type T5 = typeof x

class C1<T> {}
type T6 = T7 | number
type T7 = typeof yy
var yy: [string, T8[]];
type T8 = C<T6>

// legal cases
type T9 = () => T9
type T10 = { x: T10 } | { new(v: T10): string }
type T11 = T12[]
type T12 = [T13, string]
type T13 = typeof zz
var zz: { x: T11 }



//// [directDependenceBetweenTypeAliases.js]
// It is an error for the type specified in a type alias to depend on that type alias
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
// A type query directly depends on the type of the referenced entity.
var x = [];
var C1 = /** @class */ (function () {
    function C1() {
    }
    return C1;
}());
var yy;
var zz;
