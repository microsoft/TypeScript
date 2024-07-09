// @allowJs: true
// @checkJs: true
// @noEmit: true
// @Filename: context.js
const obj = {
    prop: 2,
    method() {
        this;
        this.prop;
        this.method;
        this.unknown; // ok, obj has a string indexer
    }
}
