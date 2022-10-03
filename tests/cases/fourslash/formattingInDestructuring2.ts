/// <reference path='fourslash.ts'/>

/////*1*/function   drawText(    { text = "", location: [x, y]=           [0, 0], bold = false }) {
////    // Draw text  
////}

format.document();
goTo.marker("1");
verify.currentLineContentIs("function drawText({ text = \"\", location: [x, y] = [0, 0], bold = false }) {");