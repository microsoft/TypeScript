// @declaration: true
// @allowJs: true
// @outDir: ./out
// @lib: es2015
// @filename: a.js
class Foo {
    async a() {
        await Promise.resolve(1);
    }

    b = async () => {
        await Promise.resolve(1);
    }
}
