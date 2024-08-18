config:
{
  "include": [
    "*.ts",
    "*.d.ts"
  ]
}
Fs::
//// [c:/dev/a.d.ts]


//// [c:/dev/a.tsx]


//// [c:/dev/b.ts]


//// [c:/dev/b.tsx]


//// [c:/dev/c.tsx]


//// [c:/dev/m.d.ts]


//// [c:/dev/m.ts]


//// [c:/dev/n.d.ts]


//// [c:/dev/n.ts]


//// [c:/dev/n.tsx]


//// [c:/dev/o.ts]


//// [c:/dev/x.d.ts]



configFileName:: c:/dev/tsconfig.json
Result
{
  "options": {
    "configFilePath": "c:/dev/tsconfig.json"
  },
  "fileNames": [
    "c:/dev/a.d.ts",
    "c:/dev/b.ts",
    "c:/dev/m.ts",
    "c:/dev/n.ts",
    "c:/dev/o.ts",
    "c:/dev/x.d.ts"
  ],
  "typeAcquisition": {
    "enable": false,
    "include": [],
    "exclude": []
  },
  "raw": {
    "include": [
      "*.ts",
      "*.d.ts"
    ]
  },
  "wildcardDirectories": {
    "c:/dev": "WatchDirectoryFlags.None"
  },
  "compileOnSave": false
}
Errors::

