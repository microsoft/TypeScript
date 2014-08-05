/// <reference path='fourslash.ts' />

// Negative tests

//////inside a comment foo(/*insideComment*/
////cl/*invalidContext*/ass InvalidSignatureHelpLocation { }
////InvalidSignatureHelpLocation(/*validContext*/);

goTo.marker('insideComment');
verify.not.signatureHelpPresent();

goTo.marker('invalidContext');
verify.not.signatureHelpPresent();

goTo.marker('validContext');
verify.not.signatureHelpPresent();