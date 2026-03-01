//// [/modules/a.ts]


//// [/sub/node_modules/a/index.ts] symlink(/modules/a.ts)

//// [/sub/node_modules/a/package.json]
{
  "version": "0.0.0",
  "main": "./index"
}

Resolving "a" from /sub/dir/foo.ts
Resolution:: {
  "resolvedModule": {
    "resolvedFileName": "/modules/a.ts",
    "originalPath": "/sub/node_modules/a/index.ts",
    "extension": ".ts",
    "isExternalLibraryImport": true,
    "resolvedUsingTsExtension": false
  },
  "failedLookupLocations": [
    "/sub/dir/node_modules/a/package.json",
    "/sub/dir/node_modules/a.ts",
    "/sub/dir/node_modules/a.tsx",
    "/sub/dir/node_modules/a.d.ts",
    "/sub/dir/node_modules/a/index.ts",
    "/sub/dir/node_modules/a/index.tsx",
    "/sub/dir/node_modules/a/index.d.ts",
    "/sub/dir/node_modules/@types/a/package.json",
    "/sub/dir/node_modules/@types/a.d.ts",
    "/sub/dir/node_modules/@types/a/index.d.ts",
    "/sub/node_modules/a.ts",
    "/sub/node_modules/a.tsx",
    "/sub/node_modules/a.d.ts"
  ],
  "affectingLocations": [
    "/sub/node_modules/a/package.json"
  ]
}

Resolving "a" from /sub/foo.ts
Resolution:: {
  "resolvedModule": {
    "resolvedFileName": "/modules/a.ts",
    "originalPath": "/sub/node_modules/a/index.ts",
    "extension": ".ts",
    "isExternalLibraryImport": true,
    "resolvedUsingTsExtension": false
  },
  "failedLookupLocations": [
    "/sub/dir/node_modules/a/package.json",
    "/sub/dir/node_modules/a.ts",
    "/sub/dir/node_modules/a.tsx",
    "/sub/dir/node_modules/a.d.ts",
    "/sub/dir/node_modules/a/index.ts",
    "/sub/dir/node_modules/a/index.tsx",
    "/sub/dir/node_modules/a/index.d.ts",
    "/sub/dir/node_modules/@types/a/package.json",
    "/sub/dir/node_modules/@types/a.d.ts",
    "/sub/dir/node_modules/@types/a/index.d.ts",
    "/sub/node_modules/a.ts",
    "/sub/node_modules/a.tsx",
    "/sub/node_modules/a.d.ts"
  ],
  "affectingLocations": [
    "/sub/node_modules/a/package.json"
  ]
}

Resolving "a" from /foo.ts
Resolution:: {
  "failedLookupLocations": [
    "/node_modules/a/package.json",
    "/node_modules/a.ts",
    "/node_modules/a.tsx",
    "/node_modules/a.d.ts",
    "/node_modules/a/index.ts",
    "/node_modules/a/index.tsx",
    "/node_modules/a/index.d.ts",
    "/node_modules/@types/a/package.json",
    "/node_modules/@types/a.d.ts",
    "/node_modules/@types/a/index.d.ts",
    "/node_modules/a/package.json",
    "/node_modules/a.js",
    "/node_modules/a.jsx",
    "/node_modules/a/index.js",
    "/node_modules/a/index.jsx"
  ]
}
