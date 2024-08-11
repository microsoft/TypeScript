// @declaration: true
// @filename: projA/index.d.ts
export declare class Foo extends Number {
    private _;
}
// @filename: projB/index.d.ts
import { Foo } from "../projA";
export declare const f: (foo: Foo) => boolean;
// @filename: projC/index.d.ts
export declare const e: {
    f: (foo: import("../projA").Foo) => boolean;
};
// @filename: projD/index.ts
import {e} from "../projC";

export const d = {e};