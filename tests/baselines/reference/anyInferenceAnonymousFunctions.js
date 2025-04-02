//// [tests/cases/compiler/anyInferenceAnonymousFunctions.ts] ////

//// [anyInferenceAnonymousFunctions.ts]
var paired: any[];

paired.reduce(function (a1, a2) {

    return a1.concat({});

} , []);

paired.reduce((b1, b2) => {

    return b1.concat({});
} , []);

paired.reduce((b3, b4) => b3.concat({}), []);

paired.map((c1) => c1.count);
paired.map(function (c2) { return c2.count; });

//// [anyInferenceAnonymousFunctions.js]
var paired;
paired.reduce(function (a1, a2) {
    return a1.concat({});
}, []);
paired.reduce(function (b1, b2) {
    return b1.concat({});
}, []);
paired.reduce(function (b3, b4) { return b3.concat({}); }, []);
paired.map(function (c1) { return c1.count; });
paired.map(function (c2) { return c2.count; });
