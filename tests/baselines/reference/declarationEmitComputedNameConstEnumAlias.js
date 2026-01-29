//// [tests/cases/compiler/declarationEmitComputedNameConstEnumAlias.ts] ////

//// [EnumExample.ts]
enum EnumExample {
    TEST = 'TEST',
}

export default EnumExample;

//// [index.ts]
import EnumExample from './EnumExample';

export default {
    [EnumExample.TEST]: {},
};

//// [EnumExample.js]
var EnumExample;
(function (EnumExample) {
    EnumExample["TEST"] = "TEST";
})(EnumExample || (EnumExample = {}));
export default EnumExample;
//// [index.js]
import EnumExample from './EnumExample';
export default {
    [EnumExample.TEST]: {},
};


//// [EnumExample.d.ts]
declare enum EnumExample {
    TEST = "TEST"
}
export default EnumExample;
//// [index.d.ts]
declare const _default: {
    TEST: {};
};
export default _default;
