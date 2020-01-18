// @allowJs: true
// @checkJs: true
// @noEmit: true

// @Filename: /defs.d.ts
interface Sig {
    [index: string]: string
}
// @Filename: /a.js
/** @implements Sig */
class B  {
}
