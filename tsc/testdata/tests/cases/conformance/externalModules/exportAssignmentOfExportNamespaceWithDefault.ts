// @esModuleInterop: true
// @target: esnext
// @filename: main.ts
// @module: commonjs
// https://github.com/microsoft/TypeScript/issues/39149
import a from "a";
a();

// @filename: external.d.ts
declare module "b" {
    export function a(): void;
    export namespace a {
        var _a: typeof a;
        export { _a as default };
    }
    export default a;
}

declare module "a" {
    import { a } from "b";
    export = a;
}