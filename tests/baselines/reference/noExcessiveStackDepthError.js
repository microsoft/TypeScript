//// [noExcessiveStackDepthError.ts]
// Repro from #46631

interface FindOperator<T> {
    foo: T;
}

type FindConditions<T> = {
    [P in keyof T]?: FindConditions<T[P]> | FindOperator<FindConditions<T[P]>>;
};

function foo<Entity>() {
    var x: FindConditions<any>;
    var x: FindConditions<Entity>;  // Excessive stack depth error not expected here
}


//// [noExcessiveStackDepthError.js]
"use strict";
// Repro from #46631
function foo() {
    var x;
    var x; // Excessive stack depth error not expected here
}


//// [noExcessiveStackDepthError.d.ts]
interface FindOperator<T> {
    foo: T;
}
declare type FindConditions<T> = {
    [P in keyof T]?: FindConditions<T[P]> | FindOperator<FindConditions<T[P]>>;
};
declare function foo<Entity>(): void;
