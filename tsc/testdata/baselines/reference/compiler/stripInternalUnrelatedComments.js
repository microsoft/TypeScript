//// [tests/cases/compiler/stripInternalUnrelatedComments.ts] ////

//// [unrelated.ts]
export class Foo {
    /**
     * Should be stripped.
     * @internal
     */
    shouldBeStripped = 1;

    // TODO: maybe make this @internal?

    /**
     * Public member.
     */
    shouldNotBeStripped = 2;

    // sure wish I had @internal support! anyway...
    mentionedInLineComment = 3;

    /* TODO: maybe make this @internal? */
    mentionedInBlockComment = 4;

    /** Public documentation mentioning `@internal`. */
    mentionedInJSDocText = 5;

    /** @internal */
    internal = 6;

    public = 7;

    // @internal
    internalLineAnnotation = 8;

    /* @internal */
    internalBlockAnnotation = 9;

    /** @internal */
    /** Additional documentation. */
    internalWithMultipleJSDocComments = 10;

    /** @internalOther */
    publicWithOtherTag = 11;

    // @internal
    /** Public documentation. */
    publicAfterUnrelatedAnnotation = 12;
}

/** @internal */
export const x = 1;

// TODO: maybe make this @internal?
/** Public declaration. */
export const publicValue = 2;

//// [unrelatedJs.js]
export class Bar {
    /** @internal */
    internal = 1;

    // TODO: maybe make this @internal?
    /** Public member. */
    public = 2;

    // sure wish I had @internal support! anyway...
    mentionedInLineComment = 3;
}




//// [unrelated.d.ts]
export declare class Foo {
    /**
     * Public member.
     */
    shouldNotBeStripped: number;
    mentionedInLineComment: number;
    mentionedInBlockComment: number;
    /** Public documentation mentioning `@internal`. */
    mentionedInJSDocText: number;
    public: number;
    /** @internalOther */
    publicWithOtherTag: number;
    /** Public documentation. */
    publicAfterUnrelatedAnnotation: number;
}
/** Public declaration. */
export declare const publicValue = 2;
//// [unrelatedJs.d.ts]
export declare class Bar {
    /** Public member. */
    public: number;
    mentionedInLineComment: number;
}
