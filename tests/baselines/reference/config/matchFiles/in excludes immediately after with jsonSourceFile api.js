config:
{
  "include": [
    "**/a.ts"
  ],
  "exclude": [
    "**/.."
  ]
}
Fs::
//// [c:/dev/a.d.ts]


//// [c:/dev/a.js]


//// [c:/dev/a.ts]


//// [c:/dev/b.js]


//// [c:/dev/b.ts]


//// [c:/dev/c.d.ts]


//// [c:/dev/js/a.js]


//// [c:/dev/js/ab.min.js]


//// [c:/dev/js/b.js]


//// [c:/dev/js/d.min.js]


//// [c:/dev/x/a.ts]


//// [c:/dev/x/aa.ts]


//// [c:/dev/x/b.ts]


//// [c:/dev/x/y/a.ts]


//// [c:/dev/x/y/b.ts]


//// [c:/dev/z/a.ts]


//// [c:/dev/z/aba.ts]


//// [c:/dev/z/abz.ts]


//// [c:/dev/z/b.ts]


//// [c:/dev/z/bba.ts]


//// [c:/dev/z/bbz.ts]


//// [c:/ext/b/a..b.ts]


//// [c:/ext/ext.ts]



configFileName:: c:/dev/tsconfig.json
Result
{
  "options": {
    "configFilePath": "c:/dev/tsconfig.json"
  },
  "fileNames": [
    "c:/dev/a.ts",
    "c:/dev/x/a.ts",
    "c:/dev/x/y/a.ts",
    "c:/dev/z/a.ts"
  ],
  "typeAcquisition": {
    "enable": false,
    "include": [],
    "exclude": []
  },
  "raw": {
    "include": [
      "**/a.ts"
    ],
    "exclude": [
      "**/.."
    ]
  },
  "wildcardDirectories": {
    "c:/dev": "WatchDirectoryFlags.Recursive"
  },
  "compileOnSave": false
}
Errors::
[96mtsconfig.json[0m:[93m6[0m:[93m5[0m - [91merror[0m[90m TS5065: [0mFile specification cannot contain a parent directory ('..') that appears after a recursive directory wildcard ('**'): '**/..'.

[7m6[0m     "**/.."
[7m [0m [91m    ~~~~~~~[0m

