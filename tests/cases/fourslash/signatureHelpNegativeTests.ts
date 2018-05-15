/// <reference path='fourslash.ts' />

// Negative tests

//////inside a comment foo(/*insideComment*/
////cl/*invalidContext*/ass InvalidSignatureHelpLocation { }
////InvalidSignatureHelpLocation(/*validContext*/);

verify.noSignatureHelp("insideComment", "invalidContext", "validContext");
