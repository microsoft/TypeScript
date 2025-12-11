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
/** Object comment */
export default {
    fn() { }
};
//// [exportDefaultFunction.js]
/** Function comment */
export default function () {
    return 42;
}
//// [exportDefaultClass.js]
/** Class comment */
export default class {
    method() { }
}
//// [exportDefaultLiteral.js]
/** Literal comment */
export default 42;
//// [exportDefaultNull.js]
/** Null comment */
export default null;


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
