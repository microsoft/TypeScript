/// <reference path="fourslash.ts"/>

// @allowJs: true
// @Filename: test.js
//// // Should return NavigateTo items for foo & bar functions
//// var bar = (function foo(a){
////     let bar = function (){
////         return true;
////     }
////     return bar;
//// })(this);
//// function dummy(){}

var expected = [
 {
  "text": "<global>",
  "kind": "module",
  "kindModifiers": "",
  "spans": [
   {
    "start": 0,
    "length": 184
   }
  ],
  "childItems": [
   {
    "text": "bar",
    "kind": "var",
    "kindModifiers": "",
    "spans": [
     {
      "start": 62,
      "length": 102
     }
    ],
    "childItems": [],
    "indent": 0,
    "bolded": false,
    "grayed": false
   },
   {
    "text": "dummy",
    "kind": "function",
    "kindModifiers": "",
    "spans": [
     {
      "start": 166,
      "length": 18
     }
    ],
    "childItems": [],
    "indent": 0,
    "bolded": false,
    "grayed": false
   }
  ],
  "indent": 0,
  "bolded": false,
  "grayed": false
 },
 {
  "text": "dummy",
  "kind": "function",
  "kindModifiers": "",
  "spans": [
   {
    "start": 166,
    "length": 18
   }
  ],
  "childItems": [],
  "indent": 1,
  "bolded": false,
  "grayed": false
 }
];

debug.printScriptLexicalStructureItems();
debug.printNavigationItems();
verify.getScriptLexicalStructureListContains("bar", "function");
