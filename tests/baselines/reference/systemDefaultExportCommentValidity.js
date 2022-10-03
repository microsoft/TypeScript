//// [systemDefaultExportCommentValidity.ts]
const Home = {}

export default Home
// There is intentionally no semicolon on the prior line, this comment should not break emit

//// [systemDefaultExportCommentValidity.js]
System.register([], function (exports_1, context_1) {
    "use strict";
    var Home;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            Home = {};
            exports_1("default", Home);
            // There is intentionally no semicolon on the prior line, this comment should not break emit
        }
    };
});
