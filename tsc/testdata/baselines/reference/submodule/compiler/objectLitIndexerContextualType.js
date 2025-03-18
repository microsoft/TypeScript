//// [tests/cases/compiler/objectLitIndexerContextualType.ts] ////

//// [objectLitIndexerContextualType.ts]
interface I {
    [s: string]: (s: string) => number;
}

interface J {
    [s: number]: (s: string) => number;
}

var x: I;
var y: J;
x = {
    s: t => t * t, // Should error
};
x = {
    0: t => t * t, // Should error
};
y = {
    s: t => t * t, // Should error
};
y = {
    0: t => t * t, // Should error
};


//// [objectLitIndexerContextualType.js]
var x;
var y;
x = {
    s: t => t * t,
};
x = {
    0: t => t * t,
};
y = {
    s: t => t * t,
};
y = {
    0: t => t * t,
};
