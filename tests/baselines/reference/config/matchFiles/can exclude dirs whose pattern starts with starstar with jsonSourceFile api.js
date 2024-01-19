config:
{
  "exclude": [
    "**/x"
  ]
}
Fs::
//// [/dev/A.ts]


//// [/dev/B.ts]


//// [/dev/a.d.ts]


//// [/dev/a.js]


//// [/dev/a.ts]


//// [/dev/b.js]


//// [/dev/b.ts]


//// [/dev/c.d.ts]


//// [/dev/js/a.js]


//// [/dev/js/b.js]


//// [/dev/q/a/c/b/d.ts]


//// [/dev/x/a.ts]


//// [/dev/x/b.ts]


//// [/dev/x/y/a.ts]


//// [/dev/x/y/b.ts]


//// [/dev/z/a.ts]


//// [/dev/z/aba.ts]


//// [/dev/z/abz.ts]


//// [/dev/z/b.ts]


//// [/dev/z/bba.ts]


//// [/dev/z/bbz.ts]



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
    "exclude": [
      "**/x"
    ]
  },
  "wildcardDirectories": {
    "c:/dev": "WatchDirectoryFlags.Recursive"
  },
  "compileOnSave": false
}
Errors::
[91merror[0m[90m TS18003: [0mNo inputs were found in config file 'c:/dev/tsconfig.json'. Specified 'include' paths were '["**/*"]' and 'exclude' paths were '["**/x"]'.

