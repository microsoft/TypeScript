// @declaration: true
// @strict: true
// @module: esnext, commonjs

// @filename: exportDefaultObject.ts
/** Object comment */
export default {
    fn() {}
}

// @filename: exportDefaultFunction.ts
/** Function comment */
export default function() {
    return 42;
}

// @filename: exportDefaultClass.ts
/** Class comment */
export default class {
    method() {}
}

// @filename: exportDefaultLiteral.ts
/** Literal comment */
export default 42;

// @filename: exportDefaultNull.ts
/** Null comment */
export default null;
