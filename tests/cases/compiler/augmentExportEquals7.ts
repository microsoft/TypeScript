// @Filename: /node_modules/lib/index.d.ts
declare var lib: () => void;
declare namespace lib {}
export = lib;

// @Filename: /node_modules/@types/lib-extender/index.d.ts
import * as lib from "lib";
declare module "lib" {
    export function fn(): void;
}
