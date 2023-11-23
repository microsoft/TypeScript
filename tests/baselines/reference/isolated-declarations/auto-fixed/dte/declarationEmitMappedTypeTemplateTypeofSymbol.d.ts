//// [tests/cases/compiler/declarationEmitMappedTypeTemplateTypeofSymbol.ts] ////

//// [a.d.ts]
export declare const timestampSymbol: unique symbol;

export declare const Timestamp: {
    [TKey in typeof timestampSymbol]: true;
};

export declare function now(): typeof Timestamp;

//// [b.ts]
import * as x from "./a";
export const timestamp: {
    [x.timestampSymbol]: true;
} = x.now();

//// [c.ts]
import { now } from "./a";

export const timestamp: {
    [timestampSymbol]: true;
} = now();

/// [Declarations] ////



//// [b.d.ts]
import * as x from "./a";
export declare const timestamp: {
    [x.timestampSymbol]: true;
};
//# sourceMappingURL=b.d.ts.map
//// [c.d.ts]
export declare const timestamp: {
    [timestampSymbol]: true;
};
//# sourceMappingURL=c.d.ts.map
/// [Errors] ////

c.ts(4,5): error TS1170: A computed property name in a type literal must refer to an expression whose type is a literal type or a 'unique symbol' type.
c.ts(4,6): error TS2304: Cannot find name 'timestampSymbol'.


==== a.d.ts (0 errors) ====
    export declare const timestampSymbol: unique symbol;
    
    export declare const Timestamp: {
        [TKey in typeof timestampSymbol]: true;
    };
    
    export declare function now(): typeof Timestamp;
    
==== b.ts (0 errors) ====
    import * as x from "./a";
    export const timestamp: {
        [x.timestampSymbol]: true;
    } = x.now();
    
==== c.ts (2 errors) ====
    import { now } from "./a";
    
    export const timestamp: {
        [timestampSymbol]: true;
        ~~~~~~~~~~~~~~~~~
!!! error TS1170: A computed property name in a type literal must refer to an expression whose type is a literal type or a 'unique symbol' type.
         ~~~~~~~~~~~~~~~
!!! error TS2304: Cannot find name 'timestampSymbol'.
    } = now();