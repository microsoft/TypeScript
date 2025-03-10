//// [tests/cases/compiler/declarationEmitJsPrivateClassStatics.ts] ////

//// [input.js]
class Test {
    static #privateStaticProp = 'Not removed for JS declaration generation; is removed for TS.';

    static #privateStaticFn() { return 'Not removed for JS declaration generation; is removed for TS.'; }

    #privateProp = 'This is removed in JS / TS declaration generation.';

    #privateFn() { return 'This is removed in JS / TS declaration generation.'; }
}




//// [input.d.ts]
declare class Test {
    #private;
}
