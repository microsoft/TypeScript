//// [tests/cases/compiler/identityRelationEnumTypes.ts] ////

//// [identityRelationEnumTypes.ts]
namespace identityRelationEnumTypes {
    export type Equals<A, B> = (<T>() => T extends B ? 1 : 0) extends (<T>() => T extends A ? 1 : 0) ? true : false;

    export enum Enum {
        A = 'a',
        B = 'b',
    }

    export type EnumValues = typeof Enum[keyof typeof Enum];

    type Result = identityRelationEnumTypes.Equals<
        identityRelationEnumTypes.Enum,
        identityRelationEnumTypes.EnumValues
    >;  // true
}


//// [identityRelationEnumTypes.js]
"use strict";
var identityRelationEnumTypes;
(function (identityRelationEnumTypes) {
    var Enum;
    (function (Enum) {
        Enum["A"] = "a";
        Enum["B"] = "b";
    })(Enum = identityRelationEnumTypes.Enum || (identityRelationEnumTypes.Enum = {}));
})(identityRelationEnumTypes || (identityRelationEnumTypes = {}));


//// [identityRelationEnumTypes.d.ts]
declare namespace identityRelationEnumTypes {
    type Equals<A, B> = (<T>() => T extends B ? 1 : 0) extends (<T>() => T extends A ? 1 : 0) ? true : false;
    enum Enum {
        A = "a",
        B = "b"
    }
    type EnumValues = typeof Enum[keyof typeof Enum];
}
