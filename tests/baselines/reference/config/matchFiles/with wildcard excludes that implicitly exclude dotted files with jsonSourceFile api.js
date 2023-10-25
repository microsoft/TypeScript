config:
{
  "include": [
    "**/.*/*"
  ],
  "exclude": [
    "**/*"
  ]
}
Fs::
//// [c:/dev/.z/.b.ts]


//// [c:/dev/.z/c.ts]


//// [c:/dev/g.min.js/.g/g.ts]


//// [c:/dev/w/.u/e.ts]


//// [c:/dev/x/.y/a.ts]


//// [c:/dev/x/d.ts]


//// [c:/dev/x/y/.e.ts]


//// [c:/dev/x/y/d.ts]



configFileName:: c:/dev/tsconfig.json
Result
{
  "options": {
    "configFilePath": "c:/dev/tsconfig.json"
  },
  "fileNames": [],
  "typeAcquisition": {
    "enable": false,
    "include": [],
    "exclude": []
  },
  "raw": {
    "include": [
      "**/.*/*"
    ],
    "exclude": [
      "**/*"
    ]
  },
  "wildcardDirectories": {},
  "compileOnSave": false
}
Errors::
[91merror[0m[90m TS18003: [0mNo inputs were found in config file 'c:/dev/tsconfig.json'. Specified 'include' paths were '["**/.*/*"]' and 'exclude' paths were '["**/*"]'.

