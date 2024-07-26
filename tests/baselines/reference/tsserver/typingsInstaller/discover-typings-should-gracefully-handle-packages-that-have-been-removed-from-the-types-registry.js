currentDirectory:: /home/src/vscode/projects/bin useCaseSensitiveFileNames: false

//// [/home/src/projects/project/app.js]


//// [/home/src/projects/project/node.d.ts]



ts.JsTyping.discoverTypings::
    {
      "fileNames": [
        "/home/src/projects/project/app.js"
      ],
      "projectRootPath": "/home/src/projects/project",
      "safeList": {},
      "packageNameToTypingLocation": {
        "node": {
          "typingLocation": "/home/src/projects/project/node.d.ts",
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
        "/home/src/projects/project/bower_components",
        "/home/src/projects/project/node_modules"
      ]
    }
