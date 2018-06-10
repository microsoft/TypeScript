// @filename: demo.d.ts
declare namespace demoNS {
    function f(): void;
}
declare module 'demoModule' {
    import alias = demoNS;
    export = alias;
}
// @filename: user.ts
import { f } from 'demoModule';
// Assign an incorrect type here to see the type of 'f'.
let x1: string = demoNS.f;
let x2: string = f;