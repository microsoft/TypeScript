//// [/root/folder1/file1.ts]


//// [/root/generated/folder1/file2.ts]


//// [/root/generated/folder2/file3/index.d.ts]


//// [/root/generated/folder2/file4/dist/types.d.ts]


//// [/root/generated/folder2/file4/package.json]
{
  "typings": "dist/types.d.ts"
}

//// [/root/someanotherfolder/file5/index.d.ts]


//// [/root/node_modules/file6.ts]


Resolving "folder1/file1" from /root/folder1/main.ts
Resolution:: {
  "resolvedModule": {
    "resolvedFileName": "/root/folder1/file1.ts",
    "extension": ".ts",
    "isExternalLibraryImport": false,
    "resolvedUsingTsExtension": false
  }
}

Resolving "folder1/file2" from /root/folder1/main.ts
Resolution:: {
  "resolvedModule": {
    "resolvedFileName": "/root/generated/folder1/file2.ts",
    "extension": ".ts",
    "isExternalLibraryImport": false,
    "resolvedUsingTsExtension": false
  },
  "failedLookupLocations": [
    "/root/folder1/file2.ts",
    "/root/folder1/file2.tsx",
    "/root/folder1/file2.d.ts",
    "/root/folder1/file2/package.json",
    "/root/folder1/file2/index.ts",
    "/root/folder1/file2/index.tsx",
    "/root/folder1/file2/index.d.ts"
  ]
}

Resolving "/rooted/folder1/file2" from /root/folder1/main.ts
Resolution:: {
  "resolvedModule": {
    "resolvedFileName": "/root/generated/folder1/file2.ts",
    "extension": ".ts",
    "isExternalLibraryImport": false,
    "resolvedUsingTsExtension": false
  }
}

Resolving "folder2/file3" from /root/folder1/main.ts
Resolution:: {
  "resolvedModule": {
    "resolvedFileName": "/root/generated/folder2/file3/index.d.ts",
    "extension": ".d.ts",
    "isExternalLibraryImport": false,
    "resolvedUsingTsExtension": false
  },
  "failedLookupLocations": [
    "/root/folder2/file3.ts",
    "/root/folder2/file3.tsx",
    "/root/folder2/file3.d.ts",
    "/root/folder2/file3/package.json",
    "/root/folder2/file3/index.ts",
    "/root/folder2/file3/index.tsx",
    "/root/folder2/file3/index.d.ts",
    "/root/generated/folder2/file3.ts",
    "/root/generated/folder2/file3.tsx",
    "/root/generated/folder2/file3.d.ts",
    "/root/generated/folder2/file3/package.json",
    "/root/generated/folder2/file3/index.ts",
    "/root/generated/folder2/file3/index.tsx"
  ]
}

Resolving "folder2/file4" from /root/folder1/main.ts
Resolution:: {
  "resolvedModule": {
    "resolvedFileName": "/root/generated/folder2/file4/dist/types.d.ts",
    "extension": ".d.ts",
    "isExternalLibraryImport": false,
    "resolvedUsingTsExtension": false
  },
  "failedLookupLocations": [
    "/root/folder2/file4.ts",
    "/root/folder2/file4.tsx",
    "/root/folder2/file4.d.ts",
    "/root/folder2/file4/package.json",
    "/root/folder2/file4/index.ts",
    "/root/folder2/file4/index.tsx",
    "/root/folder2/file4/index.d.ts",
    "/root/generated/folder2/file4.ts",
    "/root/generated/folder2/file4.tsx",
    "/root/generated/folder2/file4.d.ts"
  ],
  "affectingLocations": [
    "/root/generated/folder2/file4/package.json"
  ]
}

Resolving "somefolder/file5" from /root/folder1/main.ts
Resolution:: {
  "resolvedModule": {
    "resolvedFileName": "/root/someanotherfolder/file5/index.d.ts",
    "extension": ".d.ts",
    "isExternalLibraryImport": false,
    "resolvedUsingTsExtension": false
  },
  "failedLookupLocations": [
    "/root/someanotherfolder/file5.ts",
    "/root/someanotherfolder/file5.tsx",
    "/root/someanotherfolder/file5.d.ts",
    "/root/someanotherfolder/file5/package.json",
    "/root/someanotherfolder/file5/index.ts",
    "/root/someanotherfolder/file5/index.tsx"
  ]
}

Resolving "file6" from /root/folder1/main.ts
Resolution:: {
  "resolvedModule": {
    "resolvedFileName": "/root/node_modules/file6.ts",
    "extension": ".ts",
    "isExternalLibraryImport": true,
    "resolvedUsingTsExtension": false
  },
  "failedLookupLocations": [
    "/root/file6.ts",
    "/root/file6.tsx",
    "/root/file6.d.ts",
    "/root/file6/package.json",
    "/root/file6/index.ts",
    "/root/file6/index.tsx",
    "/root/file6/index.d.ts",
    "/root/generated/file6.ts",
    "/root/generated/file6.tsx",
    "/root/generated/file6.d.ts",
    "/root/generated/file6/package.json",
    "/root/generated/file6/index.ts",
    "/root/generated/file6/index.tsx",
    "/root/generated/file6/index.d.ts",
    "/root/folder1/node_modules/file6/package.json",
    "/root/folder1/node_modules/file6.ts",
    "/root/folder1/node_modules/file6.tsx",
    "/root/folder1/node_modules/file6.d.ts",
    "/root/folder1/node_modules/file6/index.ts",
    "/root/folder1/node_modules/file6/index.tsx",
    "/root/folder1/node_modules/file6/index.d.ts",
    "/root/folder1/node_modules/@types/file6/package.json",
    "/root/folder1/node_modules/@types/file6.d.ts",
    "/root/folder1/node_modules/@types/file6/index.d.ts",
    "/root/node_modules/file6/package.json"
  ]
}

//// [/root/folder1/file1.ts]


//// [/root/generated/folder1/file2.ts]


//// [/root/generated/folder2/file3/index.d.ts]


//// [/root/generated/folder2/file4/dist/types.d.ts]


//// [/root/generated/folder2/file4/package.json]
{
  "typings": "dist/types.d.ts"
}

//// [/root/someanotherfolder/file5/index.d.ts]


//// [/root/node_modules/file6.ts]


Resolving "folder1/file1" from /root/folder1/main.ts with host that doesnt have directoryExists
Resolution:: {
  "resolvedModule": {
    "resolvedFileName": "/root/folder1/file1.ts",
    "extension": ".ts",
    "isExternalLibraryImport": false,
    "resolvedUsingTsExtension": false
  }
}

Resolving "folder1/file2" from /root/folder1/main.ts with host that doesnt have directoryExists
Resolution:: {
  "resolvedModule": {
    "resolvedFileName": "/root/generated/folder1/file2.ts",
    "extension": ".ts",
    "isExternalLibraryImport": false,
    "resolvedUsingTsExtension": false
  },
  "failedLookupLocations": [
    "/root/folder1/file2.ts",
    "/root/folder1/file2.tsx",
    "/root/folder1/file2.d.ts",
    "/root/folder1/file2/package.json",
    "/root/folder1/file2/index.ts",
    "/root/folder1/file2/index.tsx",
    "/root/folder1/file2/index.d.ts"
  ]
}

Resolving "/rooted/folder1/file2" from /root/folder1/main.ts with host that doesnt have directoryExists
Resolution:: {
  "resolvedModule": {
    "resolvedFileName": "/root/generated/folder1/file2.ts",
    "extension": ".ts",
    "isExternalLibraryImport": false,
    "resolvedUsingTsExtension": false
  }
}

Resolving "folder2/file3" from /root/folder1/main.ts with host that doesnt have directoryExists
Resolution:: {
  "resolvedModule": {
    "resolvedFileName": "/root/generated/folder2/file3/index.d.ts",
    "extension": ".d.ts",
    "isExternalLibraryImport": false,
    "resolvedUsingTsExtension": false
  },
  "failedLookupLocations": [
    "/root/folder2/file3.ts",
    "/root/folder2/file3.tsx",
    "/root/folder2/file3.d.ts",
    "/root/folder2/file3/package.json",
    "/root/folder2/file3/index.ts",
    "/root/folder2/file3/index.tsx",
    "/root/folder2/file3/index.d.ts",
    "/root/generated/folder2/file3.ts",
    "/root/generated/folder2/file3.tsx",
    "/root/generated/folder2/file3.d.ts",
    "/root/generated/folder2/file3/package.json",
    "/root/generated/folder2/file3/index.ts",
    "/root/generated/folder2/file3/index.tsx"
  ]
}

Resolving "folder2/file4" from /root/folder1/main.ts with host that doesnt have directoryExists
Resolution:: {
  "resolvedModule": {
    "resolvedFileName": "/root/generated/folder2/file4/dist/types.d.ts",
    "extension": ".d.ts",
    "isExternalLibraryImport": false,
    "resolvedUsingTsExtension": false
  },
  "failedLookupLocations": [
    "/root/folder2/file4.ts",
    "/root/folder2/file4.tsx",
    "/root/folder2/file4.d.ts",
    "/root/folder2/file4/package.json",
    "/root/folder2/file4/index.ts",
    "/root/folder2/file4/index.tsx",
    "/root/folder2/file4/index.d.ts",
    "/root/generated/folder2/file4.ts",
    "/root/generated/folder2/file4.tsx",
    "/root/generated/folder2/file4.d.ts"
  ],
  "affectingLocations": [
    "/root/generated/folder2/file4/package.json"
  ]
}

Resolving "somefolder/file5" from /root/folder1/main.ts with host that doesnt have directoryExists
Resolution:: {
  "resolvedModule": {
    "resolvedFileName": "/root/someanotherfolder/file5/index.d.ts",
    "extension": ".d.ts",
    "isExternalLibraryImport": false,
    "resolvedUsingTsExtension": false
  },
  "failedLookupLocations": [
    "/root/someanotherfolder/file5.ts",
    "/root/someanotherfolder/file5.tsx",
    "/root/someanotherfolder/file5.d.ts",
    "/root/someanotherfolder/file5/package.json",
    "/root/someanotherfolder/file5/index.ts",
    "/root/someanotherfolder/file5/index.tsx"
  ]
}

Resolving "file6" from /root/folder1/main.ts with host that doesnt have directoryExists
Resolution:: {
  "resolvedModule": {
    "resolvedFileName": "/root/node_modules/file6.ts",
    "extension": ".ts",
    "isExternalLibraryImport": true,
    "resolvedUsingTsExtension": false
  },
  "failedLookupLocations": [
    "/root/file6.ts",
    "/root/file6.tsx",
    "/root/file6.d.ts",
    "/root/file6/package.json",
    "/root/file6/index.ts",
    "/root/file6/index.tsx",
    "/root/file6/index.d.ts",
    "/root/generated/file6.ts",
    "/root/generated/file6.tsx",
    "/root/generated/file6.d.ts",
    "/root/generated/file6/package.json",
    "/root/generated/file6/index.ts",
    "/root/generated/file6/index.tsx",
    "/root/generated/file6/index.d.ts",
    "/root/folder1/node_modules/file6/package.json",
    "/root/folder1/node_modules/file6.ts",
    "/root/folder1/node_modules/file6.tsx",
    "/root/folder1/node_modules/file6.d.ts",
    "/root/folder1/node_modules/file6/index.ts",
    "/root/folder1/node_modules/file6/index.tsx",
    "/root/folder1/node_modules/file6/index.d.ts",
    "/root/folder1/node_modules/@types/file6/package.json",
    "/root/folder1/node_modules/@types/file6.d.ts",
    "/root/folder1/node_modules/@types/file6/index.d.ts",
    "/root/node_modules/file6/package.json"
  ]
}
