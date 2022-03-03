/// <reference path="fourslash.ts"/>

//// class A {
////   #foo() {
////     class B {
////       #bar() {
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
          "kind": "method",
          "childItems": [
            {
              "text": "B",
              "kind": "class",
              "childItems": [
                {
                  "text": "#bar",
                  "kind": "method",
                  "childItems": [
                    {
                      "text": "baz",
                      "kind": "function"
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
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
      }
    ]
  },
  {
    "text": "A",
    "kind": "class",
    "childItems": [
      {
        "text": "#foo",
        "kind": "method"
      }
    ],
    "indent": 1
  },
  {
    "text": "#foo",
    "kind": "method",
    "childItems": [
      {
        "text": "B",
        "kind": "class"
      }
    ],
    "indent": 2
  },
  {
    "text": "B",
    "kind": "class",
    "childItems": [
      {
        "text": "#bar",
        "kind": "method"
      }
    ],
    "indent": 3
  },
  {
    "text": "#bar",
    "kind": "method",
    "childItems": [
      {
        "text": "baz",
        "kind": "function"
      }
    ],
    "indent": 4
  },
  {
    "text": "baz",
    "kind": "function",
    "indent": 5
  }
]);
