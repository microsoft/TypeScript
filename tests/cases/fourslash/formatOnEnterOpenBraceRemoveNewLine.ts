/// <reference path="fourslash.ts"/>

//// if(true)
//// /**/


format.setOption("PlaceOpenBraceOnNewLineForControlBlocks", false);
goTo.marker("");
edit.insert("{");
// TODO: figure out how to get rid of 3 extra spaces on second last line.
verify.currentFileContentIs(
    `if (true) {`);

    