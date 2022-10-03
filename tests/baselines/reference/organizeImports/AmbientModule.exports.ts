// ==ORIGINAL==

declare module "mod" {
    export { F1 } from "lib";
    export * from "lib";
    export { F2 } from "lib";
}
    
// ==ORGANIZED==

declare module "mod" {
    export * from "lib";
    export { F1, F2 } from "lib";
}
    