/// <reference path="fourslash.ts"/>

//// (function(){
//// var A;
//// A/*1*/
//// .a = function() { };
//// })();

verify.navigationTree(
{
  "text": "<global>",
  "kind": "script",
  "childItems": [
    {
      "text": "<function>",
      "kind": "function",
      "childItems": [
        {
          "text": "a",
          "kind": "function"
        },
        {
          "text": "A",
          "kind": "var"
        }
      ]
    }
  ]
});
