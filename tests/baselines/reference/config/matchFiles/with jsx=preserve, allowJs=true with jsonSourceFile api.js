config:
{
  "compilerOptions": {
    "jsx": "preserve",
    "allowJs": true
  }
}
Fs::
//// [c:/dev/a.d.ts]


//// [c:/dev/a.js]


//// [c:/dev/a.ts]


//// [c:/dev/b.d.ts]


//// [c:/dev/b.jsx]


//// [c:/dev/b.tsx]


//// [c:/dev/c.js]


//// [c:/dev/c.tsx]


//// [c:/dev/d.js]


//// [c:/dev/e.jsx]


//// [c:/dev/f.other]



configFileName:: c:/dev/tsconfig.json
Result
{
  "options": {
    "jsx": 1,
    "allowJs": true,
    "configFilePath": "c:/dev/tsconfig.json"
  },
  "fileNames": [
    "c:/dev/a.ts",
    "c:/dev/b.tsx",
    "c:/dev/c.tsx",
    "c:/dev/d.js",
    "c:/dev/e.jsx"
  ],
  "typeAcquisition": {
    "enable": false,
    "include": [],
    "exclude": []
  },
  "raw": {
    "compilerOptions": {
      "jsx": "preserve",
      "allowJs": true
    }
  },
  "wildcardDirectories": {
    "c:/dev": "WatchDirectoryFlags.Recursive"
  },
  "compileOnSave": false
}
Errors::

