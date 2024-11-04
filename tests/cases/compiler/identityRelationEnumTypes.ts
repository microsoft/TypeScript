// @strict: true
// @declaration: true

namespace identityRelationEnumTypes {
    export type Equals<A, B> = (<T>() => T extends B ? 1 : 0) extends (<T>() => T extends A ? 1 : 0) ? true : false;

    export enum Enum {
        A = 'a',
        B = 'b',
    }

    export type EnumValues = typeof Enum[keyof typeof Enum];
}

type Result = identityRelationEnumTypes.Equals<
    identityRelationEnumTypes.Enum,
    identityRelationEnumTypes.EnumValues
>;  // true
