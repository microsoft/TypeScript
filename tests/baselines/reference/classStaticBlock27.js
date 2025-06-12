//// [tests/cases/conformance/classes/classStaticBlock/classStaticBlock27.ts] ////

//// [classStaticBlock27.ts]
// https://github.com/microsoft/TypeScript/issues/44872

void class Foo {
    static prop = 1
    static {
        console.log(Foo.prop);
        Foo.prop++;
    }
    static {
        console.log(Foo.prop);
        Foo.prop++;
    }
    static {
        console.log(Foo.prop);
        Foo.prop++;
    }
}

//// [classStaticBlock27.js]
// https://github.com/microsoft/TypeScript/issues/44872
var _a;
void (_a = class Foo {
    },
    _a.prop = 1,
    (() => {
        console.log(_a.prop);
        _a.prop++;
    })(),
    (() => {
        console.log(_a.prop);
        _a.prop++;
    })(),
    (() => {
        console.log(_a.prop);
        _a.prop++;
    })(),
    _a);
