Fs::
//// [/app.ts]


//// [/tsconfig-base.json]
{
  "compilerOptions": {
    "types": ["node"],
    "lib": ["es2020"],
    "outDir": "./dist",
    "strict": true
  }
}

//// [/tsconfig-middle.json]
{
  "extends": "./tsconfig-base.json",
  "compilerOptions": {
    "types": ["jest"],
    "outDir": "./build"
  }
}

//// [/tsconfig.json]
{
  "extends": "./tsconfig-middle.json",
  "compilerOptions": {
    "types": null,
    "lib": null
  }
}


configFileName:: tsconfig.json
CompilerOptions::
{
  "outDir": "/build",
  "strict": true,
  "configFilePath": "/tsconfig.json"
}

TypeAcquisition::
{}

FileNames::
/app.ts
Errors::

