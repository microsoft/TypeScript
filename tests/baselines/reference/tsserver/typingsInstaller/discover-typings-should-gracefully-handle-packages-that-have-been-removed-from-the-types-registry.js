currentDirectory:: / useCaseSensitiveFileNames: false

//// [/a/b/app.js]


//// [/a/b/node.d.ts]



ts.JsTyping.discoverTypings::
    {
      "fileNames": [
        "/a/b/app.js"
      ],
      "projectRootPath": "/a/b",
      "safeList": {},
      "packageNameToTypingLocation": {
        "node": {
          "typingLocation": "/a/b/node.d.ts",
          "version": {
            "major": 1,
            "minor": 3,
            "patch": 0,
            "prerelease": [],
            "build": []
          }
        }
      },
      "typeAcquisition": {
        "enable": true
      },
      "unresolvedImports": [
        "fs",
        "bar"
      ],
      "typesRegistry": {},
      "compilerOptions": {}
    }
TI:: [hh:mm:ss:mss] Inferred typings from unresolved imports: ["node","bar"]
TI:: [hh:mm:ss:mss] Finished typings discovery:
    {
      "cachedTypingPaths": [],
      "newTypingNames": [
        "node",
        "bar"
      ],
      "filesToWatch": [
        "/a/b/bower_components",
        "/a/b/node_modules"
      ]
    }
