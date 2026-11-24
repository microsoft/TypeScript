//// [tests/cases/compiler/instantiationExpressionConstraintCycleCheckOrder.ts] ////

//// [instantiationExpressionConstraintCycleCheckOrder.ts]
// Checking the type arguments of the instantiation expressions against their
// constraints needs the variances of A, which need the type of child. The
// constraint errors and the types of child must not depend on whether child
// is queried before A is checked.

namespace InterfaceCycle {
    declare function b<U extends A = A>(): U;
    interface A<T = number> {
        value: T;
        child: typeof b<A<T>>;
    }
}

namespace ClassCycle {
    class A<T = number> {
        value!: T;
        child!: InstanceType<typeof A.B<A<T>>>;
        static B = class B<T extends A> {
            parent!: T;
        };
    }
}


//// [instantiationExpressionConstraintCycleCheckOrder.js]
"use strict";
// Checking the type arguments of the instantiation expressions against their
// constraints needs the variances of A, which need the type of child. The
// constraint errors and the types of child must not depend on whether child
// is queried before A is checked.
var InterfaceCycle;
(function (InterfaceCycle) {
})(InterfaceCycle || (InterfaceCycle = {}));
var ClassCycle;
(function (ClassCycle) {
    class A {
        value;
        child;
        static B = class B {
            parent;
        };
    }
})(ClassCycle || (ClassCycle = {}));
