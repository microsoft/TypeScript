// @declaration: true
// @filename: package.d.ts
declare namespace thing {
    export interface MyInterface {}
}
declare var thing: {
    x: thing.MyInterface;
};
export = thing;
export as namespace thing;
// @filename: globalize.d.ts
import * as thingAlias from "./package";
declare global {
    namespace thing {
        export type MyInterface = thingAlias.MyInterface;
    }
    const thing: typeof thingAlias;
}
// @filename: usage.ts
export const num = thing.x;
