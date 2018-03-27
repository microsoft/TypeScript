// @out: output.js
// @checkJs: true
// @allowJs: true
// @Filename: a.js
this.a = 10;
this.a;
a;
unknown;
this.unknown;

// also, improved types for this-prefixed globals like eval:
this.eval('hi');

// @Filename: b.js
this.a;
a;
unknown;
this.unknown;
