/// <reference path="fourslash.ts" />

///////<reference path="./Bar.ts" /> 

////function /**/[|Bar|]() {
////    // This is a reference to Bar in a comment.
////    "this is a reference to Bar in a string"
////}

goTo.marker();
verify.renameLocations(/*findInStrings:*/ false, /*findInComments:*/ false);