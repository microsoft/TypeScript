/// <reference path="fourslash.ts"/>

//// class A {
////   #foo: () => {
////     class B {
////       #bar: () => {   
////          function baz () {
////          }
////       }
////     }
////   }
//// }

verify.navigationTree({
  "text": "<global>",
  "kind": "script",
  "childItems": [
    {
      "text": "A",
      "kind": "class",
      "childItems": [
        {
          "text": "#foo",
          "kind": "property"
        }
      ]
    },
    {
      "text": "B",
      "kind": "class",
      "childItems": [
        {
          "text": "#bar",
          "kind": "property"
        }
      ]
    },
    {
      "text": "baz",
      "kind": "function"
    }
  ]
});

verify.navigationBar([
  {
    "text": "<global>",
    "kind": "script",
    "childItems": [
      {
        "text": "A",
        "kind": "class"
      },
      {
        "text": "B",
        "kind": "class"
      },
      {
        "text": "baz",
        "kind": "function"
      }
    ]
  },
  {
    "text": "A",
    "kind": "class",
    "childItems": [
      {
        "text": "#foo",
        "kind": "property"
      }
    ],
    "indent": 1
  },
  {
    "text": "B",
    "kind": "class",
    "childItems": [
      {
        "text": "#bar",
        "kind": "property"
      }
    ],
    "indent": 1
  },
  {
    "text": "baz",
    "kind": "function",
    "indent": 1
  }
]);
