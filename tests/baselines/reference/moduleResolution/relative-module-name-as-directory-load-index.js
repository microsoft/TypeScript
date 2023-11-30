Resolving "./foo" from /a/b/c.ts
//// [/a/b/c.ts]


//// [/a/b/foo/package.json]
{
  "main": "/c/d"
}

//// [/a/b/foo/index.d.ts]


Resolution:: {
  "resolvedModule": {
    "resolvedFileName": "/a/b/foo/index.d.ts",
    "extension": ".d.ts",
    "isExternalLibraryImport": false,
    "resolvedUsingTsExtension": false
  },
  "failedLookupLocations": [
    "/a/b/foo.ts",
    "/a/b/foo.tsx",
    "/a/b/foo.d.ts",
    "/c/d",
    "/c/d.ts",
    "/c/d.tsx",
    "/c/d.d.ts",
    "/c/d/index.ts",
    "/c/d/index.tsx",
    "/c/d/index.d.ts",
    "/a/b/foo/index.ts",
    "/a/b/foo/index.tsx"
  ],
  "affectingLocations": [
    "/a/b/foo/package.json"
  ]
}

Resolving "./foo" from /a/b/c.ts with host that doesnt have directoryExists
//// [/a/b/c.ts]


//// [/a/b/foo/package.json]
{
  "main": "/c/d"
}

//// [/a/b/foo/index.d.ts]


Resolution:: {
  "resolvedModule": {
    "resolvedFileName": "/a/b/foo/index.d.ts",
    "extension": ".d.ts",
    "isExternalLibraryImport": false,
    "resolvedUsingTsExtension": false
  },
  "failedLookupLocations": [
    "/a/b/foo.ts",
    "/a/b/foo.tsx",
    "/a/b/foo.d.ts",
    "/c/d",
    "/c/d.ts",
    "/c/d.tsx",
    "/c/d.d.ts",
    "/c/d/index.ts",
    "/c/d/index.tsx",
    "/c/d/index.d.ts",
    "/a/b/foo/index.ts",
    "/a/b/foo/index.tsx"
  ],
  "affectingLocations": [
    "/a/b/foo/package.json"
  ]
}
