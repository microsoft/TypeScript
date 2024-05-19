Fs::
//// [/b.ts]


//// [/bin/a.ts]


//// [/tsconfig.json]
{
  "extends": "./tsconfigWithoutConfigDir.json"
}

//// [/tsconfigWithoutConfigDir.json]
{
  "compilerOptions": {
    "outDir": "bin"
  }
}


configFileName:: tsconfig.json
FileNames::
/b.ts
Errors::


Fs::
//// [/b.ts]


//// [/bin/a.ts]


//// [/tsconfig.json]
{
  "extends": "./tsconfigWithConfigDir.json"
}

//// [/tsconfigWithConfigDir.json]
{
  "compilerOptions": {
    "outDir": "${configDir}/bin"
  }
}


configFileName:: tsconfig.json
FileNames::
/b.ts
Errors::

