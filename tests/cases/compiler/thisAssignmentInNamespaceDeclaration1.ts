// @checkJs: true
// @outDir: out/

// @filename: a.js
module foo {
    this.bar = 4;
}

// @filename: b.js
namespace blah {
    this.prop = 42;
}
