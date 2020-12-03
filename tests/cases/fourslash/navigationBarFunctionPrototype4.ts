/// <reference path="fourslash.ts"/>

// @Filename: foo.js

////var A; 
////A.prototype = { };
////A.prototype = { m() {} };
////A.prototype.a = function() { };
////A.b = function() { };
////
////var B; 
////B["prototype"] = { };
////B["prototype"] = { m() {} };
////B["prototype"]["a"] = function() { };
////B["b"] = function() { };

verify.navigationTree({
  "text": "<global>",
  "kind": "script",
  "childItems": [{ name: "A", quoted: false }, { name: "B", quoted: true }].map(({ name, quoted }) => (
    {
      "text": name,
      "kind": "class",
      "childItems": [
        {
          "text": "constructor",
          "kind": "constructor"
        },
        {
          "text": "m",
          "kind": "method"
        },
        {
          "text": quoted ? `"a"` : "a",
          "kind": "function"
        },
        {
          "text": quoted ? `"b"` : "b",
          "kind": "function"
        }
      ]
    }
  ))
});

verify.navigationBar([
  {
    "text": "<global>",
    "kind": "script",
    "childItems": ["A", "B"].map(name => (
      {
        "text": name,
        "kind": "class"
      }
    ))
  },
  ...[{ name: "A", quoted: false }, { name: "B", quoted: true }].map(({ name, quoted }) => ({
    "text": name,
    "kind": "class",
    "childItems": [
      {
        "text": "constructor",
        "kind": "constructor"
      },
      {
        "text": "m",
        "kind": "method"
      },
      {
        "text": quoted ? `"a"` : "a",
        "kind": "function"
      },
      {
        "text": quoted ? `"b"` : "b",
        "kind": "function"
      }
    ],
    "indent": 1
  }))
]);
