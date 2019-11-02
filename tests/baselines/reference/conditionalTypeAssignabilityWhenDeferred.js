//// [conditionalTypeAssignabilityWhenDeferred.ts]
let t: true;
let f: false;

<T extends "a">() => {
    t = undefined as T extends "a" ? true : false;
    f = undefined as T extends "b" ? true : false;

    t = undefined as NonNullable<T> extends "a" ? true : false;
    f = undefined as NonNullable<T> extends "b" ? true : false;

    t = undefined as [T] extends ["a"] ? true : false;
    f = undefined as [T] extends ["b"] ? true : false;
};


//// [conditionalTypeAssignabilityWhenDeferred.js]
var t;
var f;
(function () {
    t = undefined;
    f = undefined;
    t = undefined;
    f = undefined;
    t = undefined;
    f = undefined;
});
