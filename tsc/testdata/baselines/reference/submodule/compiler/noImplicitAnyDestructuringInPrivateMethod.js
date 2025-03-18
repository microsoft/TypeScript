//// [tests/cases/compiler/noImplicitAnyDestructuringInPrivateMethod.ts] ////

//// [noImplicitAnyDestructuringInPrivateMethod.ts]
type Arg = {
    a: number;
};
export class Bar {
    private bar({ a, }: Arg): number {
        return a;
    }
}
export declare class Bar2 {
    private bar({ a, });
}

//// [noImplicitAnyDestructuringInPrivateMethod.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bar = void 0;
class Bar {
    bar({ a, }) {
        return a;
    }
}
exports.Bar = Bar;
