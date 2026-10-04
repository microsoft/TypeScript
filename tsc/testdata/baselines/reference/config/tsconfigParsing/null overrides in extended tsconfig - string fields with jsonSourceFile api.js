Fs::
//// [/app.ts]


//// [/tsconfig-base.json]
{
  "compilerOptions": {
    "outDir": "./dist",
    "baseUrl": "./src",
    "rootDir": "./src"
  }
}

//// [/tsconfig.json]
{
  "extends": "./tsconfig-base.json",
  "compilerOptions": {
    "outDir": null,
    "baseUrl": null,
    "rootDir": null
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

