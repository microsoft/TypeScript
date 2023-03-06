// @strict: true
// @declaration: true

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
