// x0.d.ts
export declare let a: invalid;

// x.d.ts
declare module "./observable" {
    // import { a } from "./x0";
    export { a } from "./x0";
}