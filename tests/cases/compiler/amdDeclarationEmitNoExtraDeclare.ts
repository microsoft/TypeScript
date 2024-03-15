// @declaration: true
// @module: amd
// @outFile: dist.js
// @filename: Class.ts
import { Configurable } from "./Configurable"

export class HiddenClass {}

export class ActualClass extends Configurable(HiddenClass) {}
// @filename: Configurable.ts
export type Constructor<T> = {
    new(...args: any[]): T;
}
export function Configurable<T extends Constructor<{}>>(base: T): T {
    return class extends base {

        constructor(...args: any[]) {
            super(...args);
        }

    };
}
