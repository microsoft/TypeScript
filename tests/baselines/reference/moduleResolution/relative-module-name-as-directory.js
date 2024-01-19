Resolving "./bar" from /a/b/c/d.ts with typings: c/d/e.d.ts
//// [/a/b/c/d.ts]


//// [/a/b/c/bar/package.json]
{
  "typings": "c/d/e.d.ts"
}

//// [/a/b/c/bar/c/d/e.d.ts]


Resolution:: {
  "resolvedModule": {
    "resolvedFileName": "/a/b/c/bar/c/d/e.d.ts",
    "extension": ".d.ts",
    "isExternalLibraryImport": false,
    "resolvedUsingTsExtension": false
  },
  "failedLookupLocations": [
    "/a/b/c/bar.ts",
    "/a/b/c/bar.tsx",
    "/a/b/c/bar.d.ts"
  ],
  "affectingLocations": [
    "/a/b/c/bar/package.json"
  ]
}

Resolving "./bar" from /a/b/c/d.ts with typings: c/d/e.d.ts with host that doesnt have directoryExists
//// [/a/b/c/d.ts]


//// [/a/b/c/bar/package.json]
{
  "typings": "c/d/e.d.ts"
}

//// [/a/b/c/bar/c/d/e.d.ts]


Resolution:: {
  "resolvedModule": {
    "resolvedFileName": "/a/b/c/bar/c/d/e.d.ts",
    "extension": ".d.ts",
    "isExternalLibraryImport": false,
    "resolvedUsingTsExtension": false
  },
  "failedLookupLocations": [
    "/a/b/c/bar.ts",
    "/a/b/c/bar.tsx",
    "/a/b/c/bar.d.ts"
  ],
  "affectingLocations": [
    "/a/b/c/bar/package.json"
  ]
}

Resolving "../../bar" from /a/b/c/d.ts with typings: e.d.ts
//// [/a/b/c/d.ts]


//// [/a/bar/package.json]
{
  "typings": "e.d.ts"
}

//// [/a/bar/e.d.ts]


Resolution:: {
  "resolvedModule": {
    "resolvedFileName": "/a/bar/e.d.ts",
    "extension": ".d.ts",
    "isExternalLibraryImport": false,
    "resolvedUsingTsExtension": false
  },
  "failedLookupLocations": [
    "/a/bar.ts",
    "/a/bar.tsx",
    "/a/bar.d.ts"
  ],
  "affectingLocations": [
    "/a/bar/package.json"
  ]
}

Resolving "../../bar" from /a/b/c/d.ts with typings: e.d.ts with host that doesnt have directoryExists
//// [/a/b/c/d.ts]


//// [/a/bar/package.json]
{
  "typings": "e.d.ts"
}

//// [/a/bar/e.d.ts]


Resolution:: {
  "resolvedModule": {
    "resolvedFileName": "/a/bar/e.d.ts",
    "extension": ".d.ts",
    "isExternalLibraryImport": false,
    "resolvedUsingTsExtension": false
  },
  "failedLookupLocations": [
    "/a/bar.ts",
    "/a/bar.tsx",
    "/a/bar.d.ts"
  ],
  "affectingLocations": [
    "/a/bar/package.json"
  ]
}

Resolving "/bar" from /a/b/c/d.ts with typings: e.d.ts
//// [/a/b/c/d.ts]


//// [/bar/package.json]
{
  "typings": "e.d.ts"
}

//// [/bar/e.d.ts]


Resolution:: {
  "resolvedModule": {
    "resolvedFileName": "/bar/e.d.ts",
    "extension": ".d.ts",
    "isExternalLibraryImport": false,
    "resolvedUsingTsExtension": false
  },
  "failedLookupLocations": [
    "/bar.ts",
    "/bar.tsx",
    "/bar.d.ts"
  ],
  "affectingLocations": [
    "/bar/package.json"
  ]
}

Resolving "/bar" from /a/b/c/d.ts with typings: e.d.ts with host that doesnt have directoryExists
//// [/a/b/c/d.ts]


//// [/bar/package.json]
{
  "typings": "e.d.ts"
}

//// [/bar/e.d.ts]


Resolution:: {
  "resolvedModule": {
    "resolvedFileName": "/bar/e.d.ts",
    "extension": ".d.ts",
    "isExternalLibraryImport": false,
    "resolvedUsingTsExtension": false
  },
  "failedLookupLocations": [
    "/bar.ts",
    "/bar.tsx",
    "/bar.d.ts"
  ],
  "affectingLocations": [
    "/bar/package.json"
  ]
}

Resolving "c:/bar" from c:/a/b/c/d.ts with typings: e.d.ts
//// [c:/a/b/c/d.ts]


//// [c:/bar/package.json]
{
  "typings": "e.d.ts"
}

//// [c:/bar/e.d.ts]


Resolution:: {
  "resolvedModule": {
    "resolvedFileName": "c:/bar/e.d.ts",
    "extension": ".d.ts",
    "isExternalLibraryImport": false,
    "resolvedUsingTsExtension": false
  },
  "failedLookupLocations": [
    "c:/bar.ts",
    "c:/bar.tsx",
    "c:/bar.d.ts"
  ],
  "affectingLocations": [
    "c:/bar/package.json"
  ]
}

Resolving "c:/bar" from c:/a/b/c/d.ts with typings: e.d.ts with host that doesnt have directoryExists
//// [c:/a/b/c/d.ts]


//// [c:/bar/package.json]
{
  "typings": "e.d.ts"
}

//// [c:/bar/e.d.ts]


Resolution:: {
  "resolvedModule": {
    "resolvedFileName": "c:/bar/e.d.ts",
    "extension": ".d.ts",
    "isExternalLibraryImport": false,
    "resolvedUsingTsExtension": false
  },
  "failedLookupLocations": [
    "c:/bar.ts",
    "c:/bar.tsx",
    "c:/bar.d.ts"
  ],
  "affectingLocations": [
    "c:/bar/package.json"
  ]
}
