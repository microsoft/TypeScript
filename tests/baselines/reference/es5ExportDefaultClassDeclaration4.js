//// [tests/cases/compiler/es5ExportDefaultClassDeclaration4.ts] ////

//// [es5ExportDefaultClassDeclaration4.ts]
declare module "foo" {
    export var before: C;

    export default class C {
        method(): C;
    }

    export var after: C;

    export var t: typeof C;
}



//// [es5ExportDefaultClassDeclaration4.js]


//// [es5ExportDefaultClassDeclaration4.d.ts]
declare module "foo" {
    var before: C;
    export default class C {
        method(): C;
    }
    var after: C;
    var t: typeof C;
}
