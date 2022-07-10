/**
 * The type of `import.meta`.
 *
 * If you need to declare that a given property exists on `import.meta`,
 * this type may be augmented via interface merging.
 */
interface ImportMeta {
}

/**
 * The type for the optional second argument to `import()`.
 *
 * If your host environment supports additional options, this type may be
 * augmented via interface merging.
 */
interface ImportCallOptions {
    assert?: ImportAssertions;
}

/**
 * The type for the `assert` property of the optional second argument to `import()`.
 */
interface ImportAssertions {
    [key: string]: string;
}
