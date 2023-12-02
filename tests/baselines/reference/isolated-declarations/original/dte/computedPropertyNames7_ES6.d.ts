//// [tests/cases/conformance/es6/computedProperties/computedPropertyNames7_ES6.ts] ////

//// [computedPropertyNames7_ES6.ts]
enum E {
    member
}
var v = {
    [E.member]: 0
}

/// [Declarations] ////



//// [computedPropertyNames7_ES6.d.ts]
declare enum E {
    member = 0
}
declare var v: {
    [E.member]: number;
};
