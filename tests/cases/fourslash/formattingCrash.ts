/// <reference path='fourslash.ts' />

/////**/module Default{ 
////}

format.setOption("PlaceOpenBraceOnNewLineForFunctions", true);
format.setOption("PlaceOpenBraceOnNewLineForControlBlocks", true);

format.document();

goTo.marker();
verify.currentLineContentIs('module Default');
