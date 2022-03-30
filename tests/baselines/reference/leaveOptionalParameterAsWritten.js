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
export const f = (p?: Foo) => {}
export const o = {
  p: undefined! as Foo
};




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
declare type Foo = teams.calling.Foo;
export declare const f: (p?: Foo) => void;
export declare const o: {
    p: Foo;
};
export {};
