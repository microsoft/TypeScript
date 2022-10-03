// ==ORIGINAL==

export { D } from "lib";

declare module "mod" {
    export { F1 } from "lib";
    export * from "lib";
    export { F2 } from "lib";
}

export { E } from "lib";
export * from "lib";

// ==ORGANIZED==

export * from "lib";
export { D, E } from "lib";

declare module "mod" {
    export * from "lib";
    export { F1, F2 } from "lib";
}

