currentDirectory:: / useCaseSensitiveFileNames: false

//// [/a/b/app.js]


//// [/a/b/jquery.js]


//// [/a/b/chroma.min.js]



ts.JsTyping.discoverTypings::
    {
      "fileNames": [
        "/a/b/app.js",
        "/a/b/jquery.js",
        "/a/b/chroma.min.js"
      ],
      "projectRootPath": "/a/b",
      "safeList": {
        "jquery": "jquery",
        "chroma": "chroma-js"
      },
      "packageNameToTypingLocation": {},
      "typeAcquisition": {
        "enable": true
      },
      "unresolvedImports": [],
      "typesRegistry": {},
      "compilerOptions": {}
    }
TI:: [hh:mm:ss:mss] Inferred typings from file names: ["jquery","chroma-js"]
TI:: [hh:mm:ss:mss] Inferred typings from unresolved imports: []
TI:: [hh:mm:ss:mss] Finished typings discovery:
    {
      "cachedTypingPaths": [],
      "newTypingNames": [
        "jquery",
        "chroma-js"
      ],
      "filesToWatch": [
        "/a/b/bower_components",
        "/a/b/node_modules"
      ]
    }
