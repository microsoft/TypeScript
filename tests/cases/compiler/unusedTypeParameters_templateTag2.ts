// @allowJs: true
// @checkJs: true
// @noEmit: true
// @noUnusedParameters:true

// @Filename: /a.js

/**
 * @template T
 * @template V
 */
class C1 {
    constructor() {
        /** @type {T} */
        this.p;
    }
}

/**
 * @template T,V
 */
class C2 {
    constructor() { }
}

/**
 * @template T,V,X
 */
class C3 {
    constructor() {
        /** @type {T} */
        this.p;
    }
}