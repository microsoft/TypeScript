///<reference path="fourslash.ts" />
// @allowJs: true
// @Filename: Foo.js
/////** first line of the comment
////
////third line */
////function foo() {}
////foo/**/();
goTo.marker();
verify.verifyQuickInfoDisplayParts('function',
                                   '',
                                   { start: 63, length: 3 },
                                   [{"text": "function", "kind": "keyword"},
                                    {"text": " ", "kind": "space"},
                                    {"text": "foo", "kind": "functionName"},
                                    {"text": "(", "kind": "punctuation"},
                                    {"text": ")", "kind": "punctuation"},
                                    {"text": ":", "kind": "punctuation"},
                                    {"text": " ", "kind": "space"},
                                    {"text": "void", "kind": "keyword"}
                                   ],
                                   [{"text": "first line of the comment\n\nthird line", "kind": "text"}],
                                   undefined);
