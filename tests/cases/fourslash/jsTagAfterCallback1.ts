/// <reference path='fourslash.ts' />
// @Filename: foo.js
// @allowJs: true
// @checkJs: true
//// /** @callback Listener @yeturn {ListenerBlock} */
//// /**
////  * The function used
////  * /*1*/ settings
////  */
//// class /*2*/ListenerBlock {
//// }

// Force a syntax tree to be created.
verify.noMatchingBracePositionInCurrentFile(0);

goTo.marker('1');
edit.insert('fenster');

verify.quickInfoAt('2', 'class ListenerBlock', 'The function used\nfenster settings')
