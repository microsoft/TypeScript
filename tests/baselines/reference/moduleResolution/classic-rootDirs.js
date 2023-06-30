//// [/root/folder1/file1.ts]


//// [/root/generated/folder1/file2.ts]


//// [/root/generated/folder2/file3.ts]


//// [/folder1/file1_1.ts]


Resolving "./file2" from /root/folder1/file1.ts with host that doesnt have directoryExists
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

Resolving "../folder1/file1" from /root/generated/folder2/file3.ts with host that doesnt have directoryExists
Resolution:: {
  "resolvedModule": {
    "resolvedFileName": "/root/folder1/file1.ts",
    "extension": ".ts",
    "isExternalLibraryImport": false,
    "resolvedUsingTsExtension": false
  },
  "failedLookupLocations": [
    "/root/generated/folder1/file1.ts",
    "/root/generated/folder1/file1.tsx",
    "/root/generated/folder1/file1.d.ts"
  ]
}

Resolving "folder1/file1_1" from /root/generated/folder2/file3.ts with host that doesnt have directoryExists
Resolution:: {
  "resolvedModule": {
    "resolvedFileName": "/folder1/file1_1.ts",
    "extension": ".ts",
    "isExternalLibraryImport": false,
    "resolvedUsingTsExtension": false
  },
  "failedLookupLocations": [
    "/root/generated/folder2/folder1/file1_1.ts",
    "/root/generated/folder2/folder1/file1_1.tsx",
    "/root/generated/folder2/folder1/file1_1.d.ts",
    "/root/generated/folder1/file1_1.ts",
    "/root/generated/folder1/file1_1.tsx",
    "/root/generated/folder1/file1_1.d.ts",
    "/root/folder1/file1_1.ts",
    "/root/folder1/file1_1.tsx",
    "/root/folder1/file1_1.d.ts"
  ]
}
