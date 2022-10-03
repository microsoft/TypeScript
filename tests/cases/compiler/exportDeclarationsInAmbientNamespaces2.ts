
declare module "mod" {
    export var x: number;
}

declare namespace N {
    export { x } from "mod"; // Error
}

