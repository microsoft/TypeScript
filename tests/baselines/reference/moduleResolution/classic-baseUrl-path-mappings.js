//// [/root/folder1/file1.ts]


//// [/root/generated/folder1/file2.ts]


//// [/folder1/file3.ts]


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
    "/root/folder1/file2.d.ts"
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

Resolving "folder1/file3" from /root/folder1/main.ts with host that doesnt have directoryExists
Resolution:: {
  "resolvedModule": {
    "resolvedFileName": "/folder1/file3.ts",
    "extension": ".ts",
    "isExternalLibraryImport": false,
    "resolvedUsingTsExtension": false
  },
  "failedLookupLocations": [
    "/root/folder1/file3.ts",
    "/root/folder1/file3.tsx",
    "/root/folder1/file3.d.ts",
    "/root/generated/folder1/file3.ts",
    "/root/generated/folder1/file3.tsx",
    "/root/generated/folder1/file3.d.ts",
    "/root/folder1/folder1/file3.ts",
    "/root/folder1/folder1/file3.tsx",
    "/root/folder1/folder1/file3.d.ts",
    "/root/folder1/file3.ts",
    "/root/folder1/file3.tsx",
    "/root/folder1/file3.d.ts"
  ]
}
