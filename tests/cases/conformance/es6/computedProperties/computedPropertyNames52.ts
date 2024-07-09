// @filename: computedPropertyNames52.js
// @outFile: computedPropertyNames52-emit.js
// @allowJs: true
// @target: es5, es2015
const array = [];
for (let i = 0; i < 10; ++i) {
    array.push(class C {
        [i] = () => C;
        static [i] = 100;
    })
}
