/// <reference path="fourslash.ts"/>

//// (function(){
//// var A;
//// A/*1*/
//// .a = function() { };
//// })();

function navExact(name: string, kind: string) {
	return;
}

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
          "text": "A",
          "kind": "var"
        },
        {
          "text": "A.a",
          "kind": "function"
        }
      ]
    }
  ]
});