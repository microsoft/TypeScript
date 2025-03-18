//// [tests/cases/compiler/systemDefaultExportCommentValidity.ts] ////

//// [systemDefaultExportCommentValidity.ts]
const Home = {}

export default Home
// There is intentionally no semicolon on the prior line, this comment should not break emit

//// [systemDefaultExportCommentValidity.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Home = {};
exports.default = Home;
