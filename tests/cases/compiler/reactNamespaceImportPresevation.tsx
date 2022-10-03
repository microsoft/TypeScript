//@jsx: preserve
//@module: commonjs
//@reactNamespace: myReactLib

//@filename: modules.d.ts
declare module "my-React-Lib" {
    var a: any;
    export = a;
}

//@filename: test.tsx
import * as myReactLib from "my-React-Lib"; // should not be elided
declare var foo: any;

<foo data/>;
