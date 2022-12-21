//// [tests/cases/conformance/declarationEmit/leaveOptionalParameterAsWritten.ts] ////

//// [a.ts]
export interface Foo {}

//// [b.ts]
import * as a from "./a";
declare global {
  namespace teams {
    export namespace calling {
      export import Foo = a.Foo;
    }
  }
}

//// [c.ts]
type Foo = teams.calling.Foo;
export const bar = (p?: Foo) => {}



//// [a.d.ts]
export interface Foo {
}
//// [b.d.ts]
import * as a from "./a";
declare global {
    namespace teams {
        namespace calling {
            export import Foo = a.Foo;
        }
    }
}
//// [c.d.ts]
type Foo = teams.calling.Foo;
export declare const bar: (p?: Foo) => void;
export {};
