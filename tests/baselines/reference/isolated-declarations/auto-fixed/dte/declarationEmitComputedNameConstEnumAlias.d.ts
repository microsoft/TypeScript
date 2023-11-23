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

/// [Declarations] ////



//// [EnumExample.d.ts]
declare enum EnumExample {
    TEST = "TEST"
}
export default EnumExample;
//# sourceMappingURL=EnumExample.d.ts.map
//// [index.d.ts]
import EnumExample from './EnumExample';
declare const _default: {
    [EnumExample.TEST]: {};
};
export default _default;
//# sourceMappingURL=index.d.ts.map