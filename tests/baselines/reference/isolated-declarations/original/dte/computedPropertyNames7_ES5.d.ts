//// [tests/cases/conformance/es6/computedProperties/computedPropertyNames7_ES5.ts] ////

//// [computedPropertyNames7_ES5.ts]
enum E {
    member
}
var v = {
    [E.member]: 0
}

/// [Declarations] ////



//// [computedPropertyNames7_ES5.d.ts]
declare enum E {
    member = 0
}
declare var v: {
    [E.member]: number;
};
