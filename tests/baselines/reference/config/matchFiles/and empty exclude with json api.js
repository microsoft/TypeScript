config:
{
  "include": [
    "**/a.ts"
  ],
  "exclude": []
}
Fs::
//// [c:/dev/a.d.ts]


//// [c:/dev/a.js]


//// [c:/dev/a.ts]


//// [c:/dev/b.ts]


//// [c:/dev/bower_components/a.ts]


//// [c:/dev/jspm_packages/a.ts]


//// [c:/dev/node_modules/a.ts]


//// [c:/dev/x/a.ts]



configFileName:: c:/dev/tsconfig.json
Result
{
  "options": {
    "configFilePath": "c:/dev/tsconfig.json"
  },
  "fileNames": [
    "c:/dev/a.ts",
    "c:/dev/x/a.ts"
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
    "exclude": [],
    "compileOnSave": false
  },
  "wildcardDirectories": {
    "c:/dev": "WatchDirectoryFlags.Recursive"
  },
  "compileOnSave": false
}
Errors::

