// @filename: mod.d.ts
declare function expect(spy: Function): void;
declare function expect<T>(actual: ArrayLike<T>): void;
declare module "mod" {
    class mod {}
    export = mod;
}
// @filename: mine.ts
import "mod";

declare global {
    function expect(element: string): void;
}
// @filename: index.d.ts
declare function expect(spy: Function): void;