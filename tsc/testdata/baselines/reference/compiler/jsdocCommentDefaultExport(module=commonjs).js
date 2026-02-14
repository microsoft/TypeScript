//// [tests/cases/compiler/jsdocCommentDefaultExport.ts] ////

//// [exportDefaultObject.ts]
/** Object comment */
export default {
    fn() {}
}

//// [exportDefaultFunction.ts]
/** Function comment */
export default function() {
    return 42;
}

//// [exportDefaultClass.ts]
/** Class comment */
export default class {
    method() {}
}

//// [exportDefaultLiteral.ts]
/** Literal comment */
export default 42;

//// [exportDefaultNull.ts]
/** Null comment */
export default null;


//// [exportDefaultObject.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** Object comment */
exports.default = {
    fn() { }
};
//// [exportDefaultFunction.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
/** Function comment */
function default_1() {
    return 42;
}
//// [exportDefaultClass.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** Class comment */
class default_1 {
    method() { }
}
exports.default = default_1;
//// [exportDefaultLiteral.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** Literal comment */
exports.default = 42;
//// [exportDefaultNull.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** Null comment */
exports.default = null;


//// [exportDefaultObject.d.ts]
/** Object comment */
declare const _default: {
    fn(): void;
};
export default _default;
//// [exportDefaultFunction.d.ts]
/** Function comment */
export default function (): number;
//// [exportDefaultClass.d.ts]
/** Class comment */
export default class {
    method(): void;
}
//// [exportDefaultLiteral.d.ts]
/** Literal comment */
declare const _default: number;
export default _default;
//// [exportDefaultNull.d.ts]
/** Null comment */
declare const _default: null;
export default _default;
