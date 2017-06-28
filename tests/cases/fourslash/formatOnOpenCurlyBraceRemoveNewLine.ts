/// <reference path="fourslash.ts"/>

//// if(true)
//// /**/ }

format.setOption("PlaceOpenBraceOnNewLineForControlBlocks", false);
goTo.marker("");
edit.insert("{");
verify.currentFileContentIs(
    `if (true) { }`);
