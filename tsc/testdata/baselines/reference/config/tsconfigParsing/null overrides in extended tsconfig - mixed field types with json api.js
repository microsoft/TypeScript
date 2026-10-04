Fs::
//// [/app.ts]


//// [/tsconfig-base.json]
{
  "compilerOptions": {
    "types": ["node"],
    "lib": ["es2020", "dom"],
    "outDir": "./dist",
    "strict": true,
    "allowJs": true,
    "target": "es2020"
  }
}

//// [/tsconfig.json]
{
  "extends": "./tsconfig-base.json",
  "compilerOptions": {
    "types": null,
    "outDir": null,
    "strict": false,
    "lib": ["es2022"],
    "allowJs": null
  }
}


configFileName:: tsconfig.json
CompilerOptions::
{
  "lib": [
    "lib.es2022.d.ts"
  ],
  "strict": false,
  "target": 7,
  "configFilePath": "/tsconfig.json"
}

TypeAcquisition::
{}

FileNames::
/app.ts
Errors::

