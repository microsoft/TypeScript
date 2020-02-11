// @esModuleInterop: true
// @filename: enum.d.ts
export namespace Clone {
    const enum LOCAL {
        AUTO = 0,
        LOCAL = 1,
        NO_LOCAL = 2,
        NO_LINKS = 3
    }
}

export class Clone {
    static clone(url: string): void;
}
// @filename: usage.ts
import {Clone} from "./enum";

Clone.clone("ok");