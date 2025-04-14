//// [/linked/index.d.ts]


//// [/app/node_modules/linked/index.d.ts] symlink(/linked/index.d.ts)

//// [/app/node_modules/linked/package.json]
{
  "version": "0.0.0",
  "main": "./index"
}

Resolving "linked" from /app/app.ts when preserveSymlinks is false
Resolution:: {
  "resolvedModule": {
    "resolvedFileName": "/linked/index.d.ts",
    "originalPath": "/app/node_modules/linked/index.d.ts",
    "extension": ".d.ts",
    "isExternalLibraryImport": true,
    "resolvedUsingTsExtension": false
  },
  "failedLookupLocations": [
    "/app/node_modules/linked.ts",
    "/app/node_modules/linked.tsx",
    "/app/node_modules/linked.d.ts",
    "/app/node_modules/linked/index.ts",
    "/app/node_modules/linked/index.tsx"
  ],
  "affectingLocations": [
    "/app/node_modules/linked/package.json"
  ]
}

//// [/linked/index.d.ts]


//// [/app/node_modules/linked/index.d.ts] symlink(/linked/index.d.ts)

//// [/app/node_modules/linked/package.json]
{
  "version": "0.0.0",
  "main": "./index"
}

Resolving "linked" from /app/app.ts when preserveSymlinks is true
Resolution:: {
  "resolvedModule": {
    "resolvedFileName": "/app/node_modules/linked/index.d.ts",
    "extension": ".d.ts",
    "isExternalLibraryImport": true,
    "resolvedUsingTsExtension": false
  },
  "failedLookupLocations": [
    "/app/node_modules/linked.ts",
    "/app/node_modules/linked.tsx",
    "/app/node_modules/linked.d.ts",
    "/app/node_modules/linked/index.ts",
    "/app/node_modules/linked/index.tsx"
  ],
  "affectingLocations": [
    "/app/node_modules/linked/package.json"
  ]
}
