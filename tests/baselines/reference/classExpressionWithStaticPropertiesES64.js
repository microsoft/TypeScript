//// [tests/cases/compiler/classExpressionWithStaticPropertiesES64.ts] ////

//// [classExpressionWithStaticPropertiesES64.ts]
(class { static x = 0; });


//// [classExpressionWithStaticPropertiesES64.js]
var _a;
(_a = class {
    },
    _a.x = 0,
    _a);
