Fs::
//// [/app.ts]


//// [/tsconfig-base.json]
{
  "compilerOptions": {
    "types": ["node"],
    "lib": ["es2020"],
    "outDir": "./base",
    "strict": true
  }
}

//// [/tsconfig-middle.json]
{
  "extends": "./tsconfig-base.json",
  "compilerOptions": {
    "types": null,
    "lib": null,
    "outDir": "./middle"
  }
}

//// [/tsconfig.json]
{
  "extends": "./tsconfig-middle.json",
  "compilerOptions": {
    "outDir": "./final"
  }
}


configFileName:: tsconfig.json
CompilerOptions::
{
  "outDir": "/final",
  "strict": true,
  "configFilePath": "/tsconfig.json"
}

TypeAcquisition::
{}

FileNames::
/app.ts
Errors::

