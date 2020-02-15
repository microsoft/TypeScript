// @module: es2020
// @target: es6
// @noImplicitAny: true
const localeName = "zh-CN";
import(`./locales/${localeName}.js`).then(bar => {
    let x = bar;
});

import("./locales/" + localeName + ".js").then(bar => {
    let x = bar;
});
