/// <reference path="fourslash.ts"/>

// @Filename: test.tsx
////import * as React from "react";
////<div
////    autoComplete={(function () {
////return true/*1*/
////    })() }
////    >
////</div>

goTo.marker("1");
edit.insert(";");
verify.currentLineContentIs("        return true;");