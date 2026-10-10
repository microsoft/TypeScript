// @target: es2015
// @declaration: true
// @emitDeclarationOnly: true
// @stripInternal: true
// @allowJs: true
// @outDir: out
// @noTypesAndSymbols: true

// @filename: unrelated.ts
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

export class InternalTypeParameter<
    /** @internal */ T = unknown,
    U = unknown
> {}

export class PublicTypeParameters<
    // TODO: maybe make this @internal?
    /** Public type parameter. */
    T = unknown,
    /** Public documentation mentioning `@internal`. */
    U = unknown
> {}

// @filename: unrelatedJs.js
export class Bar {
    /** @internal */
    internal = 1;

    // TODO: maybe make this @internal?
    /** Public member. */
    public = 2;

    // sure wish I had @internal support! anyway...
    mentionedInLineComment = 3;
}
