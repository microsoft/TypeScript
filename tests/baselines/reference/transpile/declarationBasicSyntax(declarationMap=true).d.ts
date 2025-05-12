//// [variables.ts] ////
export const a = 1;
export let b = 2;
export var c = 3;
using d = undefined;
export { d };
await using e = undefined;
export { e };
//// [interface.ts] ////
export interface Foo {
    a: string;
    readonly b: string;
    c?: string;
}
//// [class.ts] ////
const i = Symbol();
export class Bar {
    a: string;
    b?: string;
    declare c: string;
    #d: string;
    public e: string;
    protected f: string;
    private g: string;
    ["h"]: string;
    [i]: string;
}

export abstract class Baz {
    abstract a: string;
    abstract method(): void;
}
//// [namespace.ts] ////
export namespace ns {
    namespace internal {
        export class Foo {}
    }
    export namespace nested {
        export import inner = internal;
    }
}
//// [alias.ts] ////
export type A<T> = { x: T };
//// [variables.d.ts] ////
export declare const a = 1;
export declare let b: number;
export declare var c: number;
declare const d: any;
export { d };
declare const e: any;
export { e };
//# sourceMappingURL=variables.d.ts.map
//// [variables.d.ts.map] ////
{"version":3,"file":"variables.d.ts","sourceRoot":"","sources":["variables.ts"],"names":[],"mappings":"AAAA,eAAO,MAAM,CAAC,IAAI,CAAC;AACnB,eAAO,IAAI,CAAC,QAAI,CAAC;AACjB,eAAO,IAAI,CAAC,QAAI,CAAC;AACjB,QAAA,MAAM,CAAC,KAAY,CAAC;AACpB,OAAO,EAAE,CAAC,EAAE,CAAC;AACb,QAAA,MAAY,CAAC,KAAY,CAAC;AAC1B,OAAO,EAAE,CAAC,EAAE,CAAC"}
//// [interface.d.ts] ////
export interface Foo {
    a: string;
    readonly b: string;
    c?: string;
}
//# sourceMappingURL=interface.d.ts.map
//// [interface.d.ts.map] ////
{"version":3,"file":"interface.d.ts","sourceRoot":"","sources":["interface.ts"],"names":[],"mappings":"AAAA,MAAM,WAAW,GAAG;IAChB,CAAC,EAAE,MAAM,CAAC;IACV,QAAQ,CAAC,CAAC,EAAE,MAAM,CAAC;IACnB,CAAC,CAAC,EAAE,MAAM,CAAC;CACd"}
//// [class.d.ts] ////
export declare class Bar {
    #private;
    a: string;
    b?: string;
    c: string;
    e: string;
    protected f: string;
    private g;
    ["h"]: string;
}
export declare abstract class Baz {
    abstract a: string;
    abstract method(): void;
}
//# sourceMappingURL=class.d.ts.map
//// [class.d.ts.map] ////
{"version":3,"file":"class.d.ts","sourceRoot":"","sources":["class.ts"],"names":[],"mappings":"AACA,qBAAa,GAAG;;IACZ,CAAC,EAAE,MAAM,CAAC;IACV,CAAC,CAAC,EAAE,MAAM,CAAC;IACH,CAAC,EAAE,MAAM,CAAC;IAEX,CAAC,EAAE,MAAM,CAAC;IACjB,SAAS,CAAC,CAAC,EAAE,MAAM,CAAC;IACpB,OAAO,CAAC,CAAC,CAAS;IAClB,CAAC,GAAG,CAAC,EAAE,MAAM,CAAC;CAEjB;AAED,8BAAsB,GAAG;IACrB,QAAQ,CAAC,CAAC,EAAE,MAAM,CAAC;IACnB,QAAQ,CAAC,MAAM,IAAI,IAAI;CAC1B"}


//// [Diagnostics reported]
class.ts(11,5): error TS9038: Computed property names on class or object literals cannot be inferred with --isolatedDeclarations.


==== class.ts (1 errors) ====
    const i = Symbol();
    export class Bar {
        a: string;
        b?: string;
        declare c: string;
        #d: string;
        public e: string;
        protected f: string;
        private g: string;
        ["h"]: string;
        [i]: string;
        ~~~
!!! error TS9038: Computed property names on class or object literals cannot be inferred with --isolatedDeclarations.
    }
    
    export abstract class Baz {
        abstract a: string;
        abstract method(): void;
    }
//// [namespace.d.ts] ////
export declare namespace ns {
    namespace internal {
        class Foo {
        }
    }
    export namespace nested {
        export import inner = internal;
    }
    export {};
}
//# sourceMappingURL=namespace.d.ts.map
//// [namespace.d.ts.map] ////
{"version":3,"file":"namespace.d.ts","sourceRoot":"","sources":["namespace.ts"],"names":[],"mappings":"AAAA,yBAAiB,EAAE,CAAC;IAChB,UAAU,QAAQ,CAAC;QACf,MAAa,GAAG;SAAG;KACtB;IACD,MAAM,WAAW,MAAM,CAAC;QACpB,MAAM,QAAQ,KAAK,GAAG,QAAQ,CAAC;KAClC;;CACJ"}
//// [alias.d.ts] ////
export type A<T> = {
    x: T;
};
//# sourceMappingURL=alias.d.ts.map
//// [alias.d.ts.map] ////
{"version":3,"file":"alias.d.ts","sourceRoot":"","sources":["alias.ts"],"names":[],"mappings":"AAAA,MAAM,MAAM,CAAC,CAAC,CAAC,IAAI;IAAE,CAAC,EAAE,CAAC,CAAA;CAAE,CAAC"}
