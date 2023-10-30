config:
{}
Fs::
//// [c:/dev/a/b/c/grandparent] symlink(c:/dev/a)
//// [c:/dev/a/b/parent] symlink(c:/dev/a)
//// [c:/dev/a/self] symlink(c:/dev/A)
//// [c:/dev/index.ts]



configFileName:: c:/dev/tsconfig.json
Result
{
  "options": {
    "configFilePath": "c:/dev/tsconfig.json"
  },
  "fileNames": [
    "c:/dev/index.ts"
  ],
  "typeAcquisition": {
    "enable": false,
    "include": [],
    "exclude": []
  },
  "raw": {},
  "wildcardDirectories": {
    "c:/dev": "WatchDirectoryFlags.Recursive"
  },
  "compileOnSave": false
}
Errors::

