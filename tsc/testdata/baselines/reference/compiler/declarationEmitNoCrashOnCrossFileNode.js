//// [tests/cases/compiler/declarationEmitNoCrashOnCrossFileNode.ts] ////

//// [index.ts]
import { foo } from './other';
export class Foo {
    public bar = foo();
}
//// [other.ts]
/**
 * Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eu aliquet lectus, nec rhoncus metus. Donec dapibus consectetur risus vitae porta. Aenean nisi neque, dignissim quis varius vel, volutpat vel tellus. Praesent lacinia molestie est, vel convallis odio ornare id. Pellentesque quis purus ante. Morbi a nisl justo. Etiam malesuada ipsum sem, fringilla rhoncus turpis ullamcorper et. Aenean laoreet, nisl id tempus pellentesque, elit elit congue felis, sit amet luctus nulla orci sit amet velit. Praesent non tincidunt nisi, at tempor eros. Quisque tincidunt euismod posuere. Ut blandit mauris elit, a porttitor orci aliquam ac. Duis imperdiet gravida ultrices. In.
 */

export function foo(): ({ a, b }: { a: string, b: string }) => void {
    return () => {}
}

//// [other.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foo = foo;
/**
 * Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eu aliquet lectus, nec rhoncus metus. Donec dapibus consectetur risus vitae porta. Aenean nisi neque, dignissim quis varius vel, volutpat vel tellus. Praesent lacinia molestie est, vel convallis odio ornare id. Pellentesque quis purus ante. Morbi a nisl justo. Etiam malesuada ipsum sem, fringilla rhoncus turpis ullamcorper et. Aenean laoreet, nisl id tempus pellentesque, elit elit congue felis, sit amet luctus nulla orci sit amet velit. Praesent non tincidunt nisi, at tempor eros. Quisque tincidunt euismod posuere. Ut blandit mauris elit, a porttitor orci aliquam ac. Duis imperdiet gravida ultrices. In.
 */
function foo() {
    return () => { };
}
//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Foo = void 0;
const other_1 = require("./other");
class Foo {
    bar = (0, other_1.foo)();
}
exports.Foo = Foo;


//// [other.d.ts]
/**
 * Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eu aliquet lectus, nec rhoncus metus. Donec dapibus consectetur risus vitae porta. Aenean nisi neque, dignissim quis varius vel, volutpat vel tellus. Praesent lacinia molestie est, vel convallis odio ornare id. Pellentesque quis purus ante. Morbi a nisl justo. Etiam malesuada ipsum sem, fringilla rhoncus turpis ullamcorper et. Aenean laoreet, nisl id tempus pellentesque, elit elit congue felis, sit amet luctus nulla orci sit amet velit. Praesent non tincidunt nisi, at tempor eros. Quisque tincidunt euismod posuere. Ut blandit mauris elit, a porttitor orci aliquam ac. Duis imperdiet gravida ultrices. In.
 */
export declare function foo(): ({ a, b }: {
    a: string;
    b: string;
}) => void;
//# sourceMappingURL=other.d.ts.map//// [index.d.ts]
export declare class Foo {
    bar: ({ a, b }: {
        a: string;
        b: string;
    }) => void;
}
//# sourceMappingURL=index.d.ts.map