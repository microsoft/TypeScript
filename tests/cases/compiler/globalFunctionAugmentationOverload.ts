// @filename: mod.d.ts
declare function expect(spy: Function): void;
declare module "mod" {
    class mod {}
    export = mod;
}
// @filename: mine.ts
import "mod";

declare global {
    function expect(element: string): void;
}