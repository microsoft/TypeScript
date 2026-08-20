// @allowJs: true
// @checkJs: true
// @strict: true
// @target: es6
// @outDir: ./out
// @filename: declarations.d.ts
declare var module: {
    exports: {
        [key: string]: any;
    };
}
// @filename: elementAccessExpressionInJS.js
if (module[calculatePropertyName(1)]) {
}
function calculatePropertyName(index) {
    // this would be some webpack index in real life
    return `property${index}`;
}
