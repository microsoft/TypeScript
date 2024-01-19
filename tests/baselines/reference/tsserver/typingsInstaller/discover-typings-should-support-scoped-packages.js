currentDirectory:: / useCaseSensitiveFileNames: false

//// [/app.js]


//// [/node_modules/@a/b/package.json]
{
  "name": "@a/b"
}


ts.JsTyping.discoverTypings::
    {
      "fileNames": [
        "/app.js"
      ],
      "projectRootPath": "/",
      "safeList": {},
      "packageNameToTypingLocation": {},
      "typeAcquisition": {
        "enable": true
      },
      "unresolvedImports": [],
      "typesRegistry": {},
      "compilerOptions": {}
    }
TI:: [hh:mm:ss:mss] Searching for typing names in /node_modules; all files: ["/node_modules/@a/b/package.json"]
TI:: [hh:mm:ss:mss]     Found package names: ["@a/b"]
TI:: [hh:mm:ss:mss] Inferred typings from unresolved imports: []
TI:: [hh:mm:ss:mss] Finished typings discovery:
    {
      "cachedTypingPaths": [],
      "newTypingNames": [
        "@a/b"
      ],
      "filesToWatch": [
        "/bower_components",
        "/node_modules"
      ]
    }
