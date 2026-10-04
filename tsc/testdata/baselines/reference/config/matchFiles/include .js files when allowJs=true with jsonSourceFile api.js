config:
{
  "compilerOptions": {
    "allowJs": true
  },
  "include": [
    "js/*"
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
    "allowJs": true,
    "configFilePath": "c:/dev/tsconfig.json"
  },
  "fileNames": [
    "c:/dev/js/a.js",
    "c:/dev/js/b.js"
  ],
  "typeAcquisition": {
    "enable": false,
    "include": [],
    "exclude": []
  },
  "raw": {
    "compilerOptions": {
      "allowJs": true
    },
    "include": [
      "js/*"
    ]
  },
  "wildcardDirectories": {
    "c:/dev/js": "WatchDirectoryFlags.None"
  },
  "compileOnSave": false
}
Errors::

