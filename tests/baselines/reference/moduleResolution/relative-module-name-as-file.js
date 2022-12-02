load as file with relative name in current directory
Resolving "./foo" from /foo/bar/baz.ts when module has extension: .ts
//// [/foo/bar/baz.ts]


//// [/foo/bar/foo.ts]


Resolution:: {
  "resolvedModule": {
    "resolvedFileName": "/foo/bar/foo.ts",
    "extension": ".ts",
    "isExternalLibraryImport": false
  },
  "failedLookupLocations": [],
  "affectingLocations": [],
  "resolutionDiagnostics": []
}

Resolving "./foo" from /foo/bar/baz.ts when module has extension: .ts with host that doesnt have directoryExists
//// [/foo/bar/baz.ts]


//// [/foo/bar/foo.ts]


Resolution:: {
  "resolvedModule": {
    "resolvedFileName": "/foo/bar/foo.ts",
    "extension": ".ts",
    "isExternalLibraryImport": false
  },
  "failedLookupLocations": [],
  "affectingLocations": [],
  "resolutionDiagnostics": []
}

Resolving "./foo" from /foo/bar/baz.ts when module has extension: .tsx
//// [/foo/bar/baz.ts]


//// [/foo/bar/foo.tsx]


Resolution:: {
  "resolvedModule": {
    "resolvedFileName": "/foo/bar/foo.tsx",
    "extension": ".tsx",
    "isExternalLibraryImport": false
  },
  "failedLookupLocations": [
    "/foo/bar/foo.ts"
  ],
  "affectingLocations": [],
  "resolutionDiagnostics": []
}

Resolving "./foo" from /foo/bar/baz.ts when module has extension: .tsx with host that doesnt have directoryExists
//// [/foo/bar/baz.ts]


//// [/foo/bar/foo.tsx]


Resolution:: {
  "resolvedModule": {
    "resolvedFileName": "/foo/bar/foo.tsx",
    "extension": ".tsx",
    "isExternalLibraryImport": false
  },
  "failedLookupLocations": [
    "/foo/bar/foo.ts"
  ],
  "affectingLocations": [],
  "resolutionDiagnostics": []
}

Resolving "./foo" from /foo/bar/baz.ts when module has extension: .d.ts
//// [/foo/bar/baz.ts]


//// [/foo/bar/foo.d.ts]


Resolution:: {
  "resolvedModule": {
    "resolvedFileName": "/foo/bar/foo.d.ts",
    "extension": ".d.ts",
    "isExternalLibraryImport": false
  },
  "failedLookupLocations": [
    "/foo/bar/foo.ts",
    "/foo/bar/foo.tsx"
  ],
  "affectingLocations": [],
  "resolutionDiagnostics": []
}

Resolving "./foo" from /foo/bar/baz.ts when module has extension: .d.ts with host that doesnt have directoryExists
//// [/foo/bar/baz.ts]


//// [/foo/bar/foo.d.ts]


Resolution:: {
  "resolvedModule": {
    "resolvedFileName": "/foo/bar/foo.d.ts",
    "extension": ".d.ts",
    "isExternalLibraryImport": false
  },
  "failedLookupLocations": [
    "/foo/bar/foo.ts",
    "/foo/bar/foo.tsx"
  ],
  "affectingLocations": [],
  "resolutionDiagnostics": []
}


load as file with relative name in parent directory
Resolving "../foo" from /foo/bar/baz.ts when module has extension: .ts
//// [/foo/bar/baz.ts]


//// [/foo/foo.ts]


Resolution:: {
  "resolvedModule": {
    "resolvedFileName": "/foo/foo.ts",
    "extension": ".ts",
    "isExternalLibraryImport": false
  },
  "failedLookupLocations": [],
  "affectingLocations": [],
  "resolutionDiagnostics": []
}

Resolving "../foo" from /foo/bar/baz.ts when module has extension: .ts with host that doesnt have directoryExists
//// [/foo/bar/baz.ts]


//// [/foo/foo.ts]


Resolution:: {
  "resolvedModule": {
    "resolvedFileName": "/foo/foo.ts",
    "extension": ".ts",
    "isExternalLibraryImport": false
  },
  "failedLookupLocations": [],
  "affectingLocations": [],
  "resolutionDiagnostics": []
}

Resolving "../foo" from /foo/bar/baz.ts when module has extension: .tsx
//// [/foo/bar/baz.ts]


//// [/foo/foo.tsx]


Resolution:: {
  "resolvedModule": {
    "resolvedFileName": "/foo/foo.tsx",
    "extension": ".tsx",
    "isExternalLibraryImport": false
  },
  "failedLookupLocations": [
    "/foo/foo.ts"
  ],
  "affectingLocations": [],
  "resolutionDiagnostics": []
}

Resolving "../foo" from /foo/bar/baz.ts when module has extension: .tsx with host that doesnt have directoryExists
//// [/foo/bar/baz.ts]


//// [/foo/foo.tsx]


Resolution:: {
  "resolvedModule": {
    "resolvedFileName": "/foo/foo.tsx",
    "extension": ".tsx",
    "isExternalLibraryImport": false
  },
  "failedLookupLocations": [
    "/foo/foo.ts"
  ],
  "affectingLocations": [],
  "resolutionDiagnostics": []
}

Resolving "../foo" from /foo/bar/baz.ts when module has extension: .d.ts
//// [/foo/bar/baz.ts]


//// [/foo/foo.d.ts]


Resolution:: {
  "resolvedModule": {
    "resolvedFileName": "/foo/foo.d.ts",
    "extension": ".d.ts",
    "isExternalLibraryImport": false
  },
  "failedLookupLocations": [
    "/foo/foo.ts",
    "/foo/foo.tsx"
  ],
  "affectingLocations": [],
  "resolutionDiagnostics": []
}

Resolving "../foo" from /foo/bar/baz.ts when module has extension: .d.ts with host that doesnt have directoryExists
//// [/foo/bar/baz.ts]


//// [/foo/foo.d.ts]


Resolution:: {
  "resolvedModule": {
    "resolvedFileName": "/foo/foo.d.ts",
    "extension": ".d.ts",
    "isExternalLibraryImport": false
  },
  "failedLookupLocations": [
    "/foo/foo.ts",
    "/foo/foo.tsx"
  ],
  "affectingLocations": [],
  "resolutionDiagnostics": []
}


load as file with name starting with directory seperator
Resolving "/foo" from /foo/bar/baz.ts when module has extension: .ts
//// [/foo/bar/baz.ts]


//// [/foo.ts]


Resolution:: {
  "resolvedModule": {
    "resolvedFileName": "/foo.ts",
    "extension": ".ts",
    "isExternalLibraryImport": false
  },
  "failedLookupLocations": [],
  "affectingLocations": [],
  "resolutionDiagnostics": []
}

Resolving "/foo" from /foo/bar/baz.ts when module has extension: .ts with host that doesnt have directoryExists
//// [/foo/bar/baz.ts]


//// [/foo.ts]


Resolution:: {
  "resolvedModule": {
    "resolvedFileName": "/foo.ts",
    "extension": ".ts",
    "isExternalLibraryImport": false
  },
  "failedLookupLocations": [],
  "affectingLocations": [],
  "resolutionDiagnostics": []
}

Resolving "/foo" from /foo/bar/baz.ts when module has extension: .tsx
//// [/foo/bar/baz.ts]


//// [/foo.tsx]


Resolution:: {
  "resolvedModule": {
    "resolvedFileName": "/foo.tsx",
    "extension": ".tsx",
    "isExternalLibraryImport": false
  },
  "failedLookupLocations": [
    "/foo.ts"
  ],
  "affectingLocations": [],
  "resolutionDiagnostics": []
}

Resolving "/foo" from /foo/bar/baz.ts when module has extension: .tsx with host that doesnt have directoryExists
//// [/foo/bar/baz.ts]


//// [/foo.tsx]


Resolution:: {
  "resolvedModule": {
    "resolvedFileName": "/foo.tsx",
    "extension": ".tsx",
    "isExternalLibraryImport": false
  },
  "failedLookupLocations": [
    "/foo.ts"
  ],
  "affectingLocations": [],
  "resolutionDiagnostics": []
}

Resolving "/foo" from /foo/bar/baz.ts when module has extension: .d.ts
//// [/foo/bar/baz.ts]


//// [/foo.d.ts]


Resolution:: {
  "resolvedModule": {
    "resolvedFileName": "/foo.d.ts",
    "extension": ".d.ts",
    "isExternalLibraryImport": false
  },
  "failedLookupLocations": [
    "/foo.ts",
    "/foo.tsx"
  ],
  "affectingLocations": [],
  "resolutionDiagnostics": []
}

Resolving "/foo" from /foo/bar/baz.ts when module has extension: .d.ts with host that doesnt have directoryExists
//// [/foo/bar/baz.ts]


//// [/foo.d.ts]


Resolution:: {
  "resolvedModule": {
    "resolvedFileName": "/foo.d.ts",
    "extension": ".d.ts",
    "isExternalLibraryImport": false
  },
  "failedLookupLocations": [
    "/foo.ts",
    "/foo.tsx"
  ],
  "affectingLocations": [],
  "resolutionDiagnostics": []
}


load as file with name starting with window root
Resolving "c:/foo" from c:/foo/bar/baz.ts when module has extension: .ts
//// [c:/foo/bar/baz.ts]


//// [c:/foo.ts]


Resolution:: {
  "resolvedModule": {
    "resolvedFileName": "c:/foo.ts",
    "extension": ".ts",
    "isExternalLibraryImport": false
  },
  "failedLookupLocations": [],
  "affectingLocations": [],
  "resolutionDiagnostics": []
}

Resolving "c:/foo" from c:/foo/bar/baz.ts when module has extension: .ts with host that doesnt have directoryExists
//// [c:/foo/bar/baz.ts]


//// [c:/foo.ts]


Resolution:: {
  "resolvedModule": {
    "resolvedFileName": "c:/foo.ts",
    "extension": ".ts",
    "isExternalLibraryImport": false
  },
  "failedLookupLocations": [],
  "affectingLocations": [],
  "resolutionDiagnostics": []
}

Resolving "c:/foo" from c:/foo/bar/baz.ts when module has extension: .tsx
//// [c:/foo/bar/baz.ts]


//// [c:/foo.tsx]


Resolution:: {
  "resolvedModule": {
    "resolvedFileName": "c:/foo.tsx",
    "extension": ".tsx",
    "isExternalLibraryImport": false
  },
  "failedLookupLocations": [
    "c:/foo.ts"
  ],
  "affectingLocations": [],
  "resolutionDiagnostics": []
}

Resolving "c:/foo" from c:/foo/bar/baz.ts when module has extension: .tsx with host that doesnt have directoryExists
//// [c:/foo/bar/baz.ts]


//// [c:/foo.tsx]


Resolution:: {
  "resolvedModule": {
    "resolvedFileName": "c:/foo.tsx",
    "extension": ".tsx",
    "isExternalLibraryImport": false
  },
  "failedLookupLocations": [
    "c:/foo.ts"
  ],
  "affectingLocations": [],
  "resolutionDiagnostics": []
}

Resolving "c:/foo" from c:/foo/bar/baz.ts when module has extension: .d.ts
//// [c:/foo/bar/baz.ts]


//// [c:/foo.d.ts]


Resolution:: {
  "resolvedModule": {
    "resolvedFileName": "c:/foo.d.ts",
    "extension": ".d.ts",
    "isExternalLibraryImport": false
  },
  "failedLookupLocations": [
    "c:/foo.ts",
    "c:/foo.tsx"
  ],
  "affectingLocations": [],
  "resolutionDiagnostics": []
}

Resolving "c:/foo" from c:/foo/bar/baz.ts when module has extension: .d.ts with host that doesnt have directoryExists
//// [c:/foo/bar/baz.ts]


//// [c:/foo.d.ts]


Resolution:: {
  "resolvedModule": {
    "resolvedFileName": "c:/foo.d.ts",
    "extension": ".d.ts",
    "isExternalLibraryImport": false
  },
  "failedLookupLocations": [
    "c:/foo.ts",
    "c:/foo.tsx"
  ],
  "affectingLocations": [],
  "resolutionDiagnostics": []
}

