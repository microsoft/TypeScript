/// <reference path='fourslash.ts'/>

////var f = function (j) {
////
////	switch (j) {
////		case 1:
/////*1*/				/* when current checkbox has focus, Firefox has changed check state already
/////*2*/				on SPACE bar press only
/////*3*/				IE does not have issue, use the CSS class
/////*4*/				input:focus[type=checkbox] (z-index = 31290)
/////*5*/				to determine whether checkbox has focus or not
////				*/
////			break;
////		case 2:
////		break;
////	}
////}
var options = format.copyFormatOptions();
options.ConvertTabsToSpaces = false;
var oldOptions = format.setFormatOptions(options);
try {
    format.document();
    goTo.marker("1");
    verify.currentLineContentIs("			/* when current checkbox has focus, Firefox has changed check state already");
    goTo.marker("2");
    verify.currentLineContentIs("			on SPACE bar press only");
    goTo.marker("3");
    verify.currentLineContentIs("			IE does not have issue, use the CSS class");
    goTo.marker("4");
    verify.currentLineContentIs("			input:focus[type=checkbox] (z-index = 31290)");
    goTo.marker("5");
    verify.currentLineContentIs("			to determine whether checkbox has focus or not");
}
finally {
    format.setFormatOptions(oldOptions);
}
