/// <reference path="fourslash.ts" />
// @allowJs: true
// @checkJs: true
// @noEmit: true

// @Filename: index.js
////var CircularList = (function () {
////    var CircularList = function() {};
////    Object.defineProperty(CircularList.prototype, "[|maxLength|]", { value: 0, writable: true });
////    CircularList.prototype.push = function (value) {
////        // ...
////        this.[|maxLength|] + this.[|maxLength|]
////    }
////    return CircularList;
////})()

verify.baselineRenameAtRangesWithText();