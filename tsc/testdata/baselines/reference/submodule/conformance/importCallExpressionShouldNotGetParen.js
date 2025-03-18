//// [tests/cases/conformance/dynamicImport/importCallExpressionShouldNotGetParen.ts] ////

//// [importCallExpressionShouldNotGetParen.ts]
const localeName = "zh-CN";
import(`./locales/${localeName}.js`).then(bar => {
    let x = bar;
});

import("./locales/" + localeName + ".js").then(bar => {
    let x = bar;
});


//// [importCallExpressionShouldNotGetParen.js]
const localeName = "zh-CN";
import(`./locales/${localeName}.js`).then(bar => {
    let x = bar;
});
import("./locales/" + localeName + ".js").then(bar => {
    let x = bar;
});
