//// [/root/a/b/main.ts]


//// [/root/m1.ts]


//// [/root/m2/index.d.ts]


//// [/root/m3/package.json]
{
  "typings": "dist/typings.d.ts"
}

//// [/root/m3/dist/typings.d.ts]


//// [/root/node_modules/m4.ts]


Resolving "m1" from /root/a/b/main.ts
Resolution:: {
  "resolvedModule": {
    "resolvedFileName": "/root/m1.ts",
    "extension": ".ts",
    "isExternalLibraryImport": false,
    "resolvedUsingTsExtension": false
  }
}

Resolving "m2" from /root/a/b/main.ts
Resolution:: {
  "resolvedModule": {
    "resolvedFileName": "/root/m2/index.d.ts",
    "extension": ".d.ts",
    "isExternalLibraryImport": false,
    "resolvedUsingTsExtension": false
  },
  "failedLookupLocations": [
    "/root/m2.ts",
    "/root/m2.tsx",
    "/root/m2.d.ts",
    "/root/m2/package.json",
    "/root/m2/index.ts",
    "/root/m2/index.tsx"
  ]
}

Resolving "m3" from /root/a/b/main.ts
Resolution:: {
  "resolvedModule": {
    "resolvedFileName": "/root/m3/dist/typings.d.ts",
    "extension": ".d.ts",
    "isExternalLibraryImport": false,
    "resolvedUsingTsExtension": false
  },
  "failedLookupLocations": [
    "/root/m3.ts",
    "/root/m3.tsx",
    "/root/m3.d.ts"
  ],
  "affectingLocations": [
    "/root/m3/package.json"
  ]
}

Resolving "m4" from /root/a/b/main.ts
Resolution:: {
  "resolvedModule": {
    "resolvedFileName": "/root/node_modules/m4.ts",
    "extension": ".ts",
    "isExternalLibraryImport": true,
    "resolvedUsingTsExtension": false
  },
  "failedLookupLocations": [
    "/root/m4.ts",
    "/root/m4.tsx",
    "/root/m4.d.ts",
    "/root/m4/package.json",
    "/root/m4/index.ts",
    "/root/m4/index.tsx",
    "/root/m4/index.d.ts",
    "/root/a/b/node_modules/m4/package.json",
    "/root/a/b/node_modules/m4.ts",
    "/root/a/b/node_modules/m4.tsx",
    "/root/a/b/node_modules/m4.d.ts",
    "/root/a/b/node_modules/m4/index.ts",
    "/root/a/b/node_modules/m4/index.tsx",
    "/root/a/b/node_modules/m4/index.d.ts",
    "/root/a/b/node_modules/@types/m4/package.json",
    "/root/a/b/node_modules/@types/m4.d.ts",
    "/root/a/b/node_modules/@types/m4/index.d.ts",
    "/root/a/node_modules/m4/package.json",
    "/root/a/node_modules/m4.ts",
    "/root/a/node_modules/m4.tsx",
    "/root/a/node_modules/m4.d.ts",
    "/root/a/node_modules/m4/index.ts",
    "/root/a/node_modules/m4/index.tsx",
    "/root/a/node_modules/m4/index.d.ts",
    "/root/a/node_modules/@types/m4/package.json",
    "/root/a/node_modules/@types/m4.d.ts",
    "/root/a/node_modules/@types/m4/index.d.ts",
    "/root/node_modules/m4/package.json"
  ]
}

//// [/root/a/b/main.ts]


//// [/root/m1.ts]


//// [/root/m2/index.d.ts]


//// [/root/m3/package.json]
{
  "typings": "dist/typings.d.ts"
}

//// [/root/m3/dist/typings.d.ts]


//// [/root/node_modules/m4.ts]


Resolving "m1" from /root/a/b/main.ts with host that doesnt have directoryExists
Resolution:: {
  "resolvedModule": {
    "resolvedFileName": "/root/m1.ts",
    "extension": ".ts",
    "isExternalLibraryImport": false,
    "resolvedUsingTsExtension": false
  }
}

Resolving "m2" from /root/a/b/main.ts with host that doesnt have directoryExists
Resolution:: {
  "resolvedModule": {
    "resolvedFileName": "/root/m2/index.d.ts",
    "extension": ".d.ts",
    "isExternalLibraryImport": false,
    "resolvedUsingTsExtension": false
  },
  "failedLookupLocations": [
    "/root/m2.ts",
    "/root/m2.tsx",
    "/root/m2.d.ts",
    "/root/m2/package.json",
    "/root/m2/index.ts",
    "/root/m2/index.tsx"
  ]
}

Resolving "m3" from /root/a/b/main.ts with host that doesnt have directoryExists
Resolution:: {
  "resolvedModule": {
    "resolvedFileName": "/root/m3/dist/typings.d.ts",
    "extension": ".d.ts",
    "isExternalLibraryImport": false,
    "resolvedUsingTsExtension": false
  },
  "failedLookupLocations": [
    "/root/m3.ts",
    "/root/m3.tsx",
    "/root/m3.d.ts"
  ],
  "affectingLocations": [
    "/root/m3/package.json"
  ]
}

Resolving "m4" from /root/a/b/main.ts with host that doesnt have directoryExists
Resolution:: {
  "resolvedModule": {
    "resolvedFileName": "/root/node_modules/m4.ts",
    "extension": ".ts",
    "isExternalLibraryImport": true,
    "resolvedUsingTsExtension": false
  },
  "failedLookupLocations": [
    "/root/m4.ts",
    "/root/m4.tsx",
    "/root/m4.d.ts",
    "/root/m4/package.json",
    "/root/m4/index.ts",
    "/root/m4/index.tsx",
    "/root/m4/index.d.ts",
    "/root/a/b/node_modules/m4/package.json",
    "/root/a/b/node_modules/m4.ts",
    "/root/a/b/node_modules/m4.tsx",
    "/root/a/b/node_modules/m4.d.ts",
    "/root/a/b/node_modules/m4/index.ts",
    "/root/a/b/node_modules/m4/index.tsx",
    "/root/a/b/node_modules/m4/index.d.ts",
    "/root/a/b/node_modules/@types/m4/package.json",
    "/root/a/b/node_modules/@types/m4.d.ts",
    "/root/a/b/node_modules/@types/m4/index.d.ts",
    "/root/a/node_modules/m4/package.json",
    "/root/a/node_modules/m4.ts",
    "/root/a/node_modules/m4.tsx",
    "/root/a/node_modules/m4.d.ts",
    "/root/a/node_modules/m4/index.ts",
    "/root/a/node_modules/m4/index.tsx",
    "/root/a/node_modules/m4/index.d.ts",
    "/root/a/node_modules/@types/m4/package.json",
    "/root/a/node_modules/@types/m4.d.ts",
    "/root/a/node_modules/@types/m4/index.d.ts",
    "/root/node_modules/m4/package.json"
  ]
}
