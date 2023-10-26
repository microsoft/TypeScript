Fs::
//// [/apath/a.ts]


//// [/apath/b.js]


//// [/apath/jsconfig.json]
{
  "typeAcquisition": {
    "enable": false,
    "include": [
      "0.d.ts"
    ],
    "exclude": [
      "0.js"
    ]
  }
}


configFileName:: jsconfig.json
TypeAcquisition::
{
  "enable": false,
  "include": [
    "0.d.ts"
  ],
  "exclude": [
    "0.js"
  ]
}
Errors::

