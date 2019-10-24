// @declaration: true
// @filename: wrapClass.ts
export function wrapClass(param: any) {
    return class Wrapped {
        foo() {
            return param;
        }
    }
}

// @filename: index.ts
import { wrapClass } from "./wrapClass";

export default wrapClass(0);