Program 1 Reused:: Not
File: a1.ts


let x = 1;

File: a2.ts


let x = 1;

File: b1.ts

export class B { x: number; }


File: b2.ts

export class B { x: number; }


File: node_modules/@types/typerefs1/index.d.ts


declare let z: string;

File: node_modules/@types/typerefs2/index.d.ts


declare let z: string;

File: f1.ts
/// <reference path="a1.ts"/>
/// <reference types="typerefs1"/>
/// <reference no-default-lib="true"/>
import { B } from './b1';
export let BB = B;
declare module './b1' { interface B { y: string; } }
resolvedModules:
./b1: {
  "resolvedModule": {
    "resolvedFileName": "/b1.ts",
    "extension": ".ts",
    "isExternalLibraryImport": false,
    "resolvedUsingTsExtension": false
  }
}
resolvedTypeReferenceDirectiveNames:
typerefs1: {
  "resolvedTypeReferenceDirective": {
    "primary": true,
    "resolvedFileName": "/node_modules/@types/typerefs1/index.d.ts",
    "isExternalLibraryImport": true
  },
  "failedLookupLocations": [
    "/node_modules/@types/typerefs1/package.json"
  ]
}

File: f2.ts
/// <reference path="a2.ts"/>
/// <reference types="typerefs2"/>
import { B } from './b2';
import { BB } from './f1';
(new BB).x; (new BB).y;
resolvedModules:
./b2: {
  "resolvedModule": {
    "resolvedFileName": "/b2.ts",
    "extension": ".ts",
    "isExternalLibraryImport": false,
    "resolvedUsingTsExtension": false
  }
}
./f1: {
  "resolvedModule": {
    "resolvedFileName": "/f1.ts",
    "extension": ".ts",
    "isExternalLibraryImport": false,
    "resolvedUsingTsExtension": false
  }
}
resolvedTypeReferenceDirectiveNames:
typerefs2: {
  "resolvedTypeReferenceDirective": {
    "primary": true,
    "resolvedFileName": "/node_modules/@types/typerefs2/index.d.ts",
    "isExternalLibraryImport": true
  },
  "failedLookupLocations": [
    "/node_modules/@types/typerefs2/package.json"
  ]
}

File '/node_modules/@types/typerefs1/package.json' does not exist.
File '/node_modules/@types/package.json' does not exist.
File '/node_modules/package.json' does not exist.
File '/package.json' does not exist.
File '/node_modules/@types/typerefs2/package.json' does not exist.
File '/node_modules/@types/package.json' does not exist according to earlier cached lookups.
File '/node_modules/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
======== Resolving type reference directive 'typerefs1', containing file '/f1.ts', root directory '/node_modules/@types'. ========
Resolving with primary search path '/node_modules/@types'.
File '/node_modules/@types/typerefs1/package.json' does not exist according to earlier cached lookups.
File '/node_modules/@types/typerefs1/index.d.ts' exists - use it as a name resolution result.
======== Type reference directive 'typerefs1' was successfully resolved to '/node_modules/@types/typerefs1/index.d.ts', primary: true. ========
======== Resolving module './b1' from '/f1.ts'. ========
Explicitly specified module resolution kind: 'Classic'.
File '/b1.ts' exists - use it as a name resolution result.
======== Module name './b1' was successfully resolved to '/b1.ts'. ========
======== Resolving type reference directive 'typerefs2', containing file '/f2.ts', root directory '/node_modules/@types'. ========
Resolving with primary search path '/node_modules/@types'.
File '/node_modules/@types/typerefs2/package.json' does not exist according to earlier cached lookups.
File '/node_modules/@types/typerefs2/index.d.ts' exists - use it as a name resolution result.
======== Type reference directive 'typerefs2' was successfully resolved to '/node_modules/@types/typerefs2/index.d.ts', primary: true. ========
======== Resolving module './b2' from '/f2.ts'. ========
Explicitly specified module resolution kind: 'Classic'.
File '/b2.ts' exists - use it as a name resolution result.
======== Module name './b2' was successfully resolved to '/b2.ts'. ========
======== Resolving module './f1' from '/f2.ts'. ========
Explicitly specified module resolution kind: 'Classic'.
File '/f1.ts' exists - use it as a name resolution result.
======== Module name './f1' was successfully resolved to '/f1.ts'. ========

MissingPaths:: []

a1.ts(3,5): error TS2451: Cannot redeclare block-scoped variable 'x'.
a2.ts(3,5): error TS2451: Cannot redeclare block-scoped variable 'x'.
node_modules/@types/typerefs1/index.d.ts(3,13): error TS2451: Cannot redeclare block-scoped variable 'z'.
node_modules/@types/typerefs2/index.d.ts(3,13): error TS2451: Cannot redeclare block-scoped variable 'z'.



Program 2 Reused:: SafeModules
File: a1.ts


let x = 1;

File: a2.ts


let x = 1;

File: b1.ts

export class B { x: number; }


File: b2.ts

export class B { x: number; }


File: node_modules/@types/typerefs1/index.d.ts


declare let z: string;

File: node_modules/@types/typerefs2/index.d.ts


declare let z: string;

File: f1.ts
/// <reference path="a1.ts"/>
/// <reference types="typerefs1"/>
import { B } from './b1';
export let BB = B;
declare module './b1' { interface B { y: string; } }
resolvedModules:
./b1: {
  "resolvedModule": {
    "resolvedFileName": "/b1.ts",
    "extension": ".ts",
    "isExternalLibraryImport": false,
    "resolvedUsingTsExtension": false
  }
}
resolvedTypeReferenceDirectiveNames:
typerefs1: {
  "resolvedTypeReferenceDirective": {
    "primary": true,
    "resolvedFileName": "/node_modules/@types/typerefs1/index.d.ts",
    "isExternalLibraryImport": true
  },
  "failedLookupLocations": [
    "/node_modules/@types/typerefs1/package.json"
  ]
}

File: f2.ts
/// <reference path="a2.ts"/>
/// <reference types="typerefs2"/>
import { B } from './b2';
import { BB } from './f1';
(new BB).x; (new BB).y;
resolvedModules:
./b2: {
  "resolvedModule": {
    "resolvedFileName": "/b2.ts",
    "extension": ".ts",
    "isExternalLibraryImport": false,
    "resolvedUsingTsExtension": false
  }
}
./f1: {
  "resolvedModule": {
    "resolvedFileName": "/f1.ts",
    "extension": ".ts",
    "isExternalLibraryImport": false,
    "resolvedUsingTsExtension": false
  }
}
resolvedTypeReferenceDirectiveNames:
typerefs2: {
  "resolvedTypeReferenceDirective": {
    "primary": true,
    "resolvedFileName": "/node_modules/@types/typerefs2/index.d.ts",
    "isExternalLibraryImport": true
  },
  "failedLookupLocations": [
    "/node_modules/@types/typerefs2/package.json"
  ]
}

File '/node_modules/@types/typerefs1/package.json' does not exist.
File '/node_modules/@types/package.json' does not exist.
File '/node_modules/package.json' does not exist.
File '/package.json' does not exist.
File '/node_modules/@types/typerefs2/package.json' does not exist.
File '/node_modules/@types/package.json' does not exist according to earlier cached lookups.
File '/node_modules/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/node_modules/@types/typerefs1/package.json' does not exist according to earlier cached lookups.
File '/node_modules/@types/package.json' does not exist according to earlier cached lookups.
File '/node_modules/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/node_modules/@types/typerefs2/package.json' does not exist according to earlier cached lookups.
File '/node_modules/@types/package.json' does not exist according to earlier cached lookups.
File '/node_modules/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
======== Resolving type reference directive 'typerefs1', containing file '/f1.ts', root directory '/node_modules/@types'. ========
Resolving with primary search path '/node_modules/@types'.
File '/node_modules/@types/typerefs1/package.json' does not exist according to earlier cached lookups.
File '/node_modules/@types/typerefs1/index.d.ts' exists - use it as a name resolution result.
======== Type reference directive 'typerefs1' was successfully resolved to '/node_modules/@types/typerefs1/index.d.ts', primary: true. ========
======== Resolving module './b1' from '/f1.ts'. ========
Explicitly specified module resolution kind: 'Classic'.
File '/b1.ts' exists - use it as a name resolution result.
======== Module name './b1' was successfully resolved to '/b1.ts'. ========
Reusing resolution of type reference directive 'typerefs2' from '/f2.ts' of old program, it was successfully resolved to '/node_modules/@types/typerefs2/index.d.ts'.
Reusing resolution of module './b2' from '/f2.ts' of old program, it was successfully resolved to '/b2.ts'.
Reusing resolution of module './f1' from '/f2.ts' of old program, it was successfully resolved to '/f1.ts'.

MissingPaths:: [
  "lib.d.ts"
]

a1.ts(3,5): error TS2451: Cannot redeclare block-scoped variable 'x'.
a2.ts(3,5): error TS2451: Cannot redeclare block-scoped variable 'x'.
node_modules/@types/typerefs1/index.d.ts(3,13): error TS2451: Cannot redeclare block-scoped variable 'z'.
node_modules/@types/typerefs2/index.d.ts(3,13): error TS2451: Cannot redeclare block-scoped variable 'z'.



Program 3 Reused:: SafeModules
File: a1.ts


let x = 1;

File: a2.ts


let x = 1;

File: b1.ts

export class B { x: number; }


File: b2.ts

export class B { x: number; }


File: node_modules/@types/typerefs1/index.d.ts


declare let z: string;

File: node_modules/@types/typerefs2/index.d.ts


declare let z: string;

File: f1.ts
/// <reference path="a1.ts"/>
import { B } from './b1';
export let BB = B;
declare module './b1' { interface B { y: string; } }
resolvedModules:
./b1: {
  "resolvedModule": {
    "resolvedFileName": "/b1.ts",
    "extension": ".ts",
    "isExternalLibraryImport": false,
    "resolvedUsingTsExtension": false
  }
}

File: f2.ts
/// <reference path="a2.ts"/>
/// <reference types="typerefs2"/>
import { B } from './b2';
import { BB } from './f1';
(new BB).x; (new BB).y;
resolvedModules:
./b2: {
  "resolvedModule": {
    "resolvedFileName": "/b2.ts",
    "extension": ".ts",
    "isExternalLibraryImport": false,
    "resolvedUsingTsExtension": false
  }
}
./f1: {
  "resolvedModule": {
    "resolvedFileName": "/f1.ts",
    "extension": ".ts",
    "isExternalLibraryImport": false,
    "resolvedUsingTsExtension": false
  }
}
resolvedTypeReferenceDirectiveNames:
typerefs2: {
  "resolvedTypeReferenceDirective": {
    "primary": true,
    "resolvedFileName": "/node_modules/@types/typerefs2/index.d.ts",
    "isExternalLibraryImport": true
  },
  "failedLookupLocations": [
    "/node_modules/@types/typerefs2/package.json"
  ]
}

File '/node_modules/@types/typerefs1/package.json' does not exist.
File '/node_modules/@types/package.json' does not exist.
File '/node_modules/package.json' does not exist.
File '/package.json' does not exist.
File '/node_modules/@types/typerefs2/package.json' does not exist.
File '/node_modules/@types/package.json' does not exist according to earlier cached lookups.
File '/node_modules/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/node_modules/@types/typerefs1/package.json' does not exist according to earlier cached lookups.
File '/node_modules/@types/package.json' does not exist according to earlier cached lookups.
File '/node_modules/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/node_modules/@types/typerefs2/package.json' does not exist according to earlier cached lookups.
File '/node_modules/@types/package.json' does not exist according to earlier cached lookups.
File '/node_modules/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
======== Resolving module './b1' from '/f1.ts'. ========
Explicitly specified module resolution kind: 'Classic'.
File '/b1.ts' exists - use it as a name resolution result.
======== Module name './b1' was successfully resolved to '/b1.ts'. ========
Reusing resolution of type reference directive 'typerefs2' from '/f2.ts' of old program, it was successfully resolved to '/node_modules/@types/typerefs2/index.d.ts'.
Reusing resolution of module './b2' from '/f2.ts' of old program, it was successfully resolved to '/b2.ts'.
Reusing resolution of module './f1' from '/f2.ts' of old program, it was successfully resolved to '/f1.ts'.

MissingPaths:: [
  "lib.d.ts"
]

a1.ts(3,5): error TS2451: Cannot redeclare block-scoped variable 'x'.
a2.ts(3,5): error TS2451: Cannot redeclare block-scoped variable 'x'.
node_modules/@types/typerefs1/index.d.ts(3,13): error TS2451: Cannot redeclare block-scoped variable 'z'.
node_modules/@types/typerefs2/index.d.ts(3,13): error TS2451: Cannot redeclare block-scoped variable 'z'.



Program 4 Reused:: SafeModules
File: a1.ts


let x = 1;

File: a2.ts


let x = 1;

File: b1.ts

export class B { x: number; }


File: b2.ts

export class B { x: number; }


File: node_modules/@types/typerefs1/index.d.ts


declare let z: string;

File: node_modules/@types/typerefs2/index.d.ts


declare let z: string;

File: f1.ts

import { B } from './b1';
export let BB = B;
declare module './b1' { interface B { y: string; } }
resolvedModules:
./b1: {
  "resolvedModule": {
    "resolvedFileName": "/b1.ts",
    "extension": ".ts",
    "isExternalLibraryImport": false,
    "resolvedUsingTsExtension": false
  }
}

File: f2.ts
/// <reference path="a2.ts"/>
/// <reference types="typerefs2"/>
import { B } from './b2';
import { BB } from './f1';
(new BB).x; (new BB).y;
resolvedModules:
./b2: {
  "resolvedModule": {
    "resolvedFileName": "/b2.ts",
    "extension": ".ts",
    "isExternalLibraryImport": false,
    "resolvedUsingTsExtension": false
  }
}
./f1: {
  "resolvedModule": {
    "resolvedFileName": "/f1.ts",
    "extension": ".ts",
    "isExternalLibraryImport": false,
    "resolvedUsingTsExtension": false
  }
}
resolvedTypeReferenceDirectiveNames:
typerefs2: {
  "resolvedTypeReferenceDirective": {
    "primary": true,
    "resolvedFileName": "/node_modules/@types/typerefs2/index.d.ts",
    "isExternalLibraryImport": true
  },
  "failedLookupLocations": [
    "/node_modules/@types/typerefs2/package.json"
  ]
}

File '/node_modules/@types/typerefs1/package.json' does not exist.
File '/node_modules/@types/package.json' does not exist.
File '/node_modules/package.json' does not exist.
File '/package.json' does not exist.
File '/node_modules/@types/typerefs2/package.json' does not exist.
File '/node_modules/@types/package.json' does not exist according to earlier cached lookups.
File '/node_modules/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/node_modules/@types/typerefs1/package.json' does not exist according to earlier cached lookups.
File '/node_modules/@types/package.json' does not exist according to earlier cached lookups.
File '/node_modules/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/node_modules/@types/typerefs2/package.json' does not exist according to earlier cached lookups.
File '/node_modules/@types/package.json' does not exist according to earlier cached lookups.
File '/node_modules/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
======== Resolving module './b1' from '/f1.ts'. ========
Explicitly specified module resolution kind: 'Classic'.
File '/b1.ts' exists - use it as a name resolution result.
======== Module name './b1' was successfully resolved to '/b1.ts'. ========
Reusing resolution of type reference directive 'typerefs2' from '/f2.ts' of old program, it was successfully resolved to '/node_modules/@types/typerefs2/index.d.ts'.
Reusing resolution of module './b2' from '/f2.ts' of old program, it was successfully resolved to '/b2.ts'.
Reusing resolution of module './f1' from '/f2.ts' of old program, it was successfully resolved to '/f1.ts'.

MissingPaths:: [
  "lib.d.ts"
]

a1.ts(3,5): error TS2451: Cannot redeclare block-scoped variable 'x'.
a2.ts(3,5): error TS2451: Cannot redeclare block-scoped variable 'x'.
node_modules/@types/typerefs1/index.d.ts(3,13): error TS2451: Cannot redeclare block-scoped variable 'z'.
node_modules/@types/typerefs2/index.d.ts(3,13): error TS2451: Cannot redeclare block-scoped variable 'z'.



Program 5 Reused:: Completely
File: a1.ts


let x = 1;

File: a2.ts


let x = 1;

File: b1.ts

export class B { x: number; }


File: b2.ts

export class B { x: number; }


File: node_modules/@types/typerefs1/index.d.ts


declare let z: string;

File: node_modules/@types/typerefs2/index.d.ts


declare let z: string;

File: f1.ts

import { B } from './b1';
declare module './b1' { interface B { y: string; } }
resolvedModules:
./b1: {
  "resolvedModule": {
    "resolvedFileName": "/b1.ts",
    "extension": ".ts",
    "isExternalLibraryImport": false,
    "resolvedUsingTsExtension": false
  }
}

File: f2.ts
/// <reference path="a2.ts"/>
/// <reference types="typerefs2"/>
import { B } from './b2';
import { BB } from './f1';
(new BB).x; (new BB).y;
resolvedModules:
./b2: {
  "resolvedModule": {
    "resolvedFileName": "/b2.ts",
    "extension": ".ts",
    "isExternalLibraryImport": false,
    "resolvedUsingTsExtension": false
  }
}
./f1: {
  "resolvedModule": {
    "resolvedFileName": "/f1.ts",
    "extension": ".ts",
    "isExternalLibraryImport": false,
    "resolvedUsingTsExtension": false
  }
}
resolvedTypeReferenceDirectiveNames:
typerefs2: {
  "resolvedTypeReferenceDirective": {
    "primary": true,
    "resolvedFileName": "/node_modules/@types/typerefs2/index.d.ts",
    "isExternalLibraryImport": true
  },
  "failedLookupLocations": [
    "/node_modules/@types/typerefs2/package.json"
  ]
}

File '/node_modules/@types/typerefs1/package.json' does not exist.
File '/node_modules/@types/package.json' does not exist.
File '/node_modules/package.json' does not exist.
File '/package.json' does not exist.
File '/node_modules/@types/typerefs2/package.json' does not exist.
File '/node_modules/@types/package.json' does not exist according to earlier cached lookups.
File '/node_modules/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
======== Resolving module './b1' from '/f1.ts'. ========
Explicitly specified module resolution kind: 'Classic'.
File '/b1.ts' exists - use it as a name resolution result.
======== Module name './b1' was successfully resolved to '/b1.ts'. ========

MissingPaths:: [
  "lib.d.ts"
]

a1.ts(3,5): error TS2451: Cannot redeclare block-scoped variable 'x'.
a2.ts(3,5): error TS2451: Cannot redeclare block-scoped variable 'x'.
f2.ts(4,10): error TS2305: Module '"./f1"' has no exported member 'BB'.
node_modules/@types/typerefs1/index.d.ts(3,13): error TS2451: Cannot redeclare block-scoped variable 'z'.
node_modules/@types/typerefs2/index.d.ts(3,13): error TS2451: Cannot redeclare block-scoped variable 'z'.



Program 6 Reused:: SafeModules
File: a1.ts


let x = 1;

File: a2.ts


let x = 1;

File: b1.ts

export class B { x: number; }


File: b2.ts

export class B { x: number; }


File: node_modules/@types/typerefs1/index.d.ts


declare let z: string;

File: node_modules/@types/typerefs2/index.d.ts


declare let z: string;

File: f1.ts

import { B } from './b1';

resolvedModules:
./b1: {
  "resolvedModule": {
    "resolvedFileName": "/b1.ts",
    "extension": ".ts",
    "isExternalLibraryImport": false,
    "resolvedUsingTsExtension": false
  }
}

File: f2.ts
/// <reference path="a2.ts"/>
/// <reference types="typerefs2"/>
import { B } from './b2';
import { BB } from './f1';
(new BB).x; (new BB).y;
resolvedModules:
./b2: {
  "resolvedModule": {
    "resolvedFileName": "/b2.ts",
    "extension": ".ts",
    "isExternalLibraryImport": false,
    "resolvedUsingTsExtension": false
  }
}
./f1: {
  "resolvedModule": {
    "resolvedFileName": "/f1.ts",
    "extension": ".ts",
    "isExternalLibraryImport": false,
    "resolvedUsingTsExtension": false
  }
}
resolvedTypeReferenceDirectiveNames:
typerefs2: {
  "resolvedTypeReferenceDirective": {
    "primary": true,
    "resolvedFileName": "/node_modules/@types/typerefs2/index.d.ts",
    "isExternalLibraryImport": true
  },
  "failedLookupLocations": [
    "/node_modules/@types/typerefs2/package.json"
  ]
}

File '/node_modules/@types/typerefs1/package.json' does not exist.
File '/node_modules/@types/package.json' does not exist.
File '/node_modules/package.json' does not exist.
File '/package.json' does not exist.
File '/node_modules/@types/typerefs2/package.json' does not exist.
File '/node_modules/@types/package.json' does not exist according to earlier cached lookups.
File '/node_modules/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/node_modules/@types/typerefs1/package.json' does not exist according to earlier cached lookups.
File '/node_modules/@types/package.json' does not exist according to earlier cached lookups.
File '/node_modules/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/node_modules/@types/typerefs2/package.json' does not exist according to earlier cached lookups.
File '/node_modules/@types/package.json' does not exist according to earlier cached lookups.
File '/node_modules/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
======== Resolving module './b1' from '/f1.ts'. ========
Explicitly specified module resolution kind: 'Classic'.
File '/b1.ts' exists - use it as a name resolution result.
======== Module name './b1' was successfully resolved to '/b1.ts'. ========
Reusing resolution of type reference directive 'typerefs2' from '/f2.ts' of old program, it was successfully resolved to '/node_modules/@types/typerefs2/index.d.ts'.
Reusing resolution of module './b2' from '/f2.ts' of old program, it was successfully resolved to '/b2.ts'.
Reusing resolution of module './f1' from '/f2.ts' of old program, it was successfully resolved to '/f1.ts'.

MissingPaths:: [
  "lib.d.ts"
]

a1.ts(3,5): error TS2451: Cannot redeclare block-scoped variable 'x'.
a2.ts(3,5): error TS2451: Cannot redeclare block-scoped variable 'x'.
f2.ts(4,10): error TS2305: Module '"./f1"' has no exported member 'BB'.
node_modules/@types/typerefs1/index.d.ts(3,13): error TS2451: Cannot redeclare block-scoped variable 'z'.
node_modules/@types/typerefs2/index.d.ts(3,13): error TS2451: Cannot redeclare block-scoped variable 'z'.



Program 7 Reused:: SafeModules
File: a1.ts


let x = 1;

File: a2.ts


let x = 1;

File: b1.ts

export class B { x: number; }


File: b2.ts

export class B { x: number; }


File: node_modules/@types/typerefs1/index.d.ts


declare let z: string;

File: node_modules/@types/typerefs2/index.d.ts


declare let z: string;

File: f1.ts




File: f2.ts
/// <reference path="a2.ts"/>
/// <reference types="typerefs2"/>
import { B } from './b2';
import { BB } from './f1';
(new BB).x; (new BB).y;
resolvedModules:
./b2: {
  "resolvedModule": {
    "resolvedFileName": "/b2.ts",
    "extension": ".ts",
    "isExternalLibraryImport": false,
    "resolvedUsingTsExtension": false
  }
}
./f1: {
  "resolvedModule": {
    "resolvedFileName": "/f1.ts",
    "extension": ".ts",
    "isExternalLibraryImport": false,
    "resolvedUsingTsExtension": false
  }
}
resolvedTypeReferenceDirectiveNames:
typerefs2: {
  "resolvedTypeReferenceDirective": {
    "primary": true,
    "resolvedFileName": "/node_modules/@types/typerefs2/index.d.ts",
    "isExternalLibraryImport": true
  },
  "failedLookupLocations": [
    "/node_modules/@types/typerefs2/package.json"
  ]
}

File '/node_modules/@types/typerefs1/package.json' does not exist.
File '/node_modules/@types/package.json' does not exist.
File '/node_modules/package.json' does not exist.
File '/package.json' does not exist.
File '/node_modules/@types/typerefs2/package.json' does not exist.
File '/node_modules/@types/package.json' does not exist according to earlier cached lookups.
File '/node_modules/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/node_modules/@types/typerefs1/package.json' does not exist according to earlier cached lookups.
File '/node_modules/@types/package.json' does not exist according to earlier cached lookups.
File '/node_modules/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/node_modules/@types/typerefs2/package.json' does not exist according to earlier cached lookups.
File '/node_modules/@types/package.json' does not exist according to earlier cached lookups.
File '/node_modules/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
Reusing resolution of type reference directive 'typerefs2' from '/f2.ts' of old program, it was successfully resolved to '/node_modules/@types/typerefs2/index.d.ts'.
Reusing resolution of module './b2' from '/f2.ts' of old program, it was successfully resolved to '/b2.ts'.
Reusing resolution of module './f1' from '/f2.ts' of old program, it was successfully resolved to '/f1.ts'.

MissingPaths:: [
  "lib.d.ts"
]

a1.ts(3,5): error TS2451: Cannot redeclare block-scoped variable 'x'.
a2.ts(3,5): error TS2451: Cannot redeclare block-scoped variable 'x'.
f2.ts(4,20): error TS2306: File 'f1.ts' is not a module.
node_modules/@types/typerefs1/index.d.ts(3,13): error TS2451: Cannot redeclare block-scoped variable 'z'.
node_modules/@types/typerefs2/index.d.ts(3,13): error TS2451: Cannot redeclare block-scoped variable 'z'.


