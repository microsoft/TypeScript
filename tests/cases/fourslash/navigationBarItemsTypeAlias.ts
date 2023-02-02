/// <reference path="fourslash.ts"/>

////type T = number | string;
////type K = {
////    foo: string;
////} | {
////    bar: number;
////};
////type F = [{
////    bar: number;
////}];

verify.navigationTree({
    "text": "<global>",
    "kind": "script",
    "childItems": [
      {
        "text": "F",
        "kind": "type",
        "childItems": [
          {
            "text": "0",
            "childItems": [
              {
                "text": "bar",
                "kind": "property"
              }
            ]
          }
        ]
      },
      {
        "text": "K",
        "kind": "type",
        "childItems": [
          {
            "text": "bar",
            "kind": "property"
          },
          {
            "text": "foo",
            "kind": "property"
          }
        ]
      },
      {
        "text": "T",
        "kind": "type"
      }
    ]
  });

verify.navigationBar([
    {
      "text": "<global>",
      "kind": "script",
      "childItems": [
        {
          "text": "F",
          "kind": "type"
        },
        {
          "text": "K",
          "kind": "type"
        },
        {
          "text": "T",
          "kind": "type"
        }
      ]
    },
    {
      "text": "F",
      "kind": "type",
      "childItems": [
        {
          "text": "0"
        }
      ],
      "indent": 1
    },
    {
      "text": "0",
      "childItems": [
        {
          "text": "bar",
          "kind": "property"
        }
      ],
      "indent": 2
    },
    {
      "text": "K",
      "kind": "type",
      "childItems": [
        {
          "text": "bar",
          "kind": "property"
        },
        {
          "text": "foo",
          "kind": "property"
        }
      ],
      "indent": 1
    },
    {
      "text": "T",
      "kind": "type",
      "indent": 1
    }
  ]);
