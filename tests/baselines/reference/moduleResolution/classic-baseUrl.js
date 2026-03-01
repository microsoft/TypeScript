//// [/root/a/b/main.ts]


//// [/root/x/m1.ts]


//// [/m2.ts]


Resolving "m1" from /root/a/b/main.ts
Resolution:: {
  "resolvedModule": {
    "resolvedFileName": "/root/x/m1.ts",
    "extension": ".ts",
    "isExternalLibraryImport": false,
    "resolvedUsingTsExtension": false
  }
}

Resolving "m2" from /root/a/b/main.ts
Resolution:: {
  "resolvedModule": {
    "resolvedFileName": "/m2.ts",
    "extension": ".ts",
    "isExternalLibraryImport": false,
    "resolvedUsingTsExtension": false
  },
  "failedLookupLocations": [
    "/root/x/m2.ts",
    "/root/x/m2.tsx",
    "/root/x/m2.d.ts",
    "/root/a/b/m2.ts",
    "/root/a/b/m2.tsx",
    "/root/a/b/m2.d.ts",
    "/root/a/m2.ts",
    "/root/a/m2.tsx",
    "/root/a/m2.d.ts",
    "/root/m2.ts",
    "/root/m2.tsx",
    "/root/m2.d.ts"
  ]
}

//// [/root/a/b/main.ts]


//// [/root/x/m1.ts]


//// [/m2.ts]


Resolving "m1" from /root/a/b/main.ts with host that doesnt have directoryExists
Resolution:: {
  "resolvedModule": {
    "resolvedFileName": "/root/x/m1.ts",
    "extension": ".ts",
    "isExternalLibraryImport": false,
    "resolvedUsingTsExtension": false
  }
}

Resolving "m2" from /root/a/b/main.ts with host that doesnt have directoryExists
Resolution:: {
  "resolvedModule": {
    "resolvedFileName": "/m2.ts",
    "extension": ".ts",
    "isExternalLibraryImport": false,
    "resolvedUsingTsExtension": false
  },
  "failedLookupLocations": [
    "/root/x/m2.ts",
    "/root/x/m2.tsx",
    "/root/x/m2.d.ts",
    "/root/a/b/m2.ts",
    "/root/a/b/m2.tsx",
    "/root/a/b/m2.d.ts",
    "/root/a/m2.ts",
    "/root/a/m2.tsx",
    "/root/a/m2.d.ts",
    "/root/m2.ts",
    "/root/m2.tsx",
    "/root/m2.d.ts"
  ]
}
