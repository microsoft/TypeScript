Fs::
//// [/src/main.ts]
export {}

//// [/src/utils.ts]
export {}

//// [/tsconfig-base/backend.json]
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "display": "Backend",
  "compilerOptions": {
    "allowJs": true,
    "module": "nodenext",
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "allowSyntheticDefaultImports": true,
    "target": "esnext",
    "lib": ["ESNext"],
    "incremental": false,
    "esModuleInterop": true,
    "noImplicitAny": true,
    "moduleResolution": "nodenext",
    "types": ["node", "vitest/globals"],
    "sourceMap": true,
    "strictPropertyInitialization": false
  },
  "files": [
    "types/ical2json.d.ts",
    "types/express.d.ts",
    "types/multer.d.ts",
    "types/reset.d.ts",
    "types/stripe-custom-typings.d.ts",
    "types/nestjs-modules.d.ts",
    "types/luxon.d.ts",
    "types/nestjs-pino.d.ts"
  ],
  "ts-node": {
    "files": true
  }
}

//// [/tsconfig-base/types/express.d.ts]
export {}

//// [/tsconfig-base/types/ical2json.d.ts]
export {}

//// [/tsconfig-base/types/luxon.d.ts]
declare module 'luxon' {
  interface TSSettings {
    throwOnInvalid: true
  }
}
export {}

//// [/tsconfig-base/types/multer.d.ts]
export {}

//// [/tsconfig-base/types/nestjs-modules.d.ts]
export {}

//// [/tsconfig-base/types/nestjs-pino.d.ts]
export {}

//// [/tsconfig-base/types/reset.d.ts]
export {}

//// [/tsconfig-base/types/stripe-custom-typings.d.ts]
export {}

//// [/tsconfig.json]
{
  "extends": "./tsconfig-base/backend.json",
  "compilerOptions": {
    "baseUrl": "./",
    "outDir": "dist",
    "rootDir": "src",
    "resolveJsonModule": true
  },
  "exclude": ["node_modules", "dist"],
  "include": ["src/**/*"]
}


configFileName:: tsconfig.json
CompilerOptions::
{
  "allowJs": true,
  "allowSyntheticDefaultImports": true,
  "baseUrl": "/",
  "emitDecoratorMetadata": true,
  "esModuleInterop": true,
  "experimentalDecorators": true,
  "incremental": false,
  "lib": [
    "lib.esnext.d.ts"
  ],
  "module": 199,
  "moduleResolution": 99,
  "noImplicitAny": true,
  "outDir": "/dist",
  "resolveJsonModule": true,
  "removeComments": true,
  "rootDir": "/src",
  "strictPropertyInitialization": false,
  "sourceMap": true,
  "target": 99,
  "types": [
    "node",
    "vitest/globals"
  ],
  "configFilePath": "/tsconfig.json"
}

TypeAcquisition::
{}

FileNames::
/tsconfig-base/types/ical2json.d.ts,/tsconfig-base/types/express.d.ts,/tsconfig-base/types/multer.d.ts,/tsconfig-base/types/reset.d.ts,/tsconfig-base/types/stripe-custom-typings.d.ts,/tsconfig-base/types/nestjs-modules.d.ts,/tsconfig-base/types/luxon.d.ts,/tsconfig-base/types/nestjs-pino.d.ts,/src/main.ts,/src/utils.ts
Errors::

