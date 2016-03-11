/// <reference path="fourslash.ts"/>

// @Filename: test.ts
//// let v1 = true;
//// var v2 = false;
//// const c1 = true;
//// 
//// namespace N1 {
////     var v3 = 10;
////     export var v4 = true;
////     
////     export function f1() {
////         const v5 = 42;
////         function inner1(){}
////     }
////     
////     function f2() {
////         function inner2(){
////             function inner3(){}
////         }
////     }
//// }



debug.printScriptLexicalStructureItems();
debug.printNavigationItems();
verify.getScriptLexicalStructureListContains("N", "module");

var priorResult = [
 {
  "text": "<global>",
  "kind": "module",
  "kindModifiers": "",
  "spans": [
   {
    "start": 0,
    "length": 297
   }
  ],
  "childItems": [
   {
    "text": "c1",
    "kind": "const",
    "kindModifiers": "",
    "spans": [
     {
      "start": 37,
      "length": 9
     }
    ],
    "childItems": [],
    "indent": 0,
    "bolded": false,
    "grayed": false
   },
   {
    "text": "v1",
    "kind": "let",
    "kindModifiers": "",
    "spans": [
     {
      "start": 4,
      "length": 9
     }
    ],
    "childItems": [],
    "indent": 0,
    "bolded": false,
    "grayed": false
   },
   {
    "text": "v2",
    "kind": "var",
    "kindModifiers": "",
    "spans": [
     {
      "start": 19,
      "length": 10
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
  "text": "N1",
  "kind": "module",
  "kindModifiers": "",
  "spans": [
   {
    "start": 49,
    "length": 248
   }
  ],
  "childItems": [
   {
    "text": "f1",
    "kind": "function",
    "kindModifiers": "export",
    "spans": [
     {
      "start": 116,
      "length": 79
     }
    ],
    "childItems": [],
    "indent": 0,
    "bolded": false,
    "grayed": false
   },
   {
    "text": "f2",
    "kind": "function",
    "kindModifiers": "",
    "spans": [
     {
      "start": 205,
      "length": 90
     }
    ],
    "childItems": [],
    "indent": 0,
    "bolded": false,
    "grayed": false
   },
   {
    "text": "v3",
    "kind": "var",
    "kindModifiers": "",
    "spans": [
     {
      "start": 72,
      "length": 7
     }
    ],
    "childItems": [],
    "indent": 0,
    "bolded": false,
    "grayed": false
   },
   {
    "text": "v4",
    "kind": "var",
    "kindModifiers": "export",
    "spans": [
     {
      "start": 96,
      "length": 9
     }
    ],
    "childItems": [],
    "indent": 0,
    "bolded": false,
    "grayed": false
   }
  ],
  "indent": 1,
  "bolded": false,
  "grayed": false
 },
 {
  "text": "f1",
  "kind": "function",
  "kindModifiers": "export",
  "spans": [
   {
    "start": 116,
    "length": 79
   }
  ],
  "childItems": [
   {
    "text": "inner1",
    "kind": "function",
    "kindModifiers": "",
    "spans": [
     {
      "start": 170,
      "length": 19
     }
    ],
    "childItems": [],
    "indent": 0,
    "bolded": false,
    "grayed": false
   }
  ],
  "indent": 2,
  "bolded": false,
  "grayed": false
 },
 {
  "text": "f2",
  "kind": "function",
  "kindModifiers": "",
  "spans": [
   {
    "start": 205,
    "length": 90
   }
  ],
  "childItems": [
   {
    "text": "inner2",
    "kind": "function",
    "kindModifiers": "",
    "spans": [
     {
      "start": 229,
      "length": 60
     }
    ],
    "childItems": [],
    "indent": 0,
    "bolded": false,
    "grayed": false
   }
  ],
  "indent": 2,
  "bolded": false,
  "grayed": false
 },
 {
  "text": "inner2",
  "kind": "function",
  "kindModifiers": "",
  "spans": [
   {
    "start": 229,
    "length": 60
   }
  ],
  "childItems": [
   {
    "text": "inner3",
    "kind": "function",
    "kindModifiers": "",
    "spans": [
     {
      "start": 260,
      "length": 19
     }
    ],
    "childItems": [],
    "indent": 0,
    "bolded": false,
    "grayed": false
   }
  ],
  "indent": 3,
  "bolded": false,
  "grayed": false
 }
];