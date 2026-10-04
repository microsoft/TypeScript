Fs::
//// [/app.ts]


//// [/tsconfig-base.json]
{
  "compilerOptions": {
    "types": ["node", "@types/jest"],
    "lib": ["es2020", "dom"],
    "typeRoots": ["./types", "./node_modules/@types"]
  }
}

//// [/tsconfig.json]
{
  "extends": "./tsconfig-base.json",
  "compilerOptions": {
    "types": null,
    "lib": null,
    "typeRoots": null
  }
}


configFileName:: tsconfig.json
CompilerOptions::
{
  "configFilePath": "/tsconfig.json"
}

TypeAcquisition::
{}

FileNames::
/app.ts
Errors::

