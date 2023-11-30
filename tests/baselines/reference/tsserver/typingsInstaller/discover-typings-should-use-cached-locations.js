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
      "typesRegistry": {
        "node": {
          "latest": "1.3.0",
          "ts2.0": "1.0.0",
          "ts2.1": "1.0.0",
          "ts2.2": "1.2.0",
          "ts2.3": "1.3.0",
          "ts2.4": "1.3.0",
          "ts2.5": "1.3.0",
          "ts2.6": "1.3.0",
          "ts2.7": "1.3.0"
        }
      },
      "compilerOptions": {}
    }
TI:: [hh:mm:ss:mss] Inferred typings from unresolved imports: ["node","bar"]
TI:: [hh:mm:ss:mss] Finished typings discovery:
    {
      "cachedTypingPaths": [
        "/a/b/node.d.ts"
      ],
      "newTypingNames": [
        "bar"
      ],
      "filesToWatch": [
        "/a/b/bower_components",
        "/a/b/node_modules"
      ]
    }
