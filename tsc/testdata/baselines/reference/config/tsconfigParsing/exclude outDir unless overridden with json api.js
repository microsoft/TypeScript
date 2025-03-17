Fs::
//// [/b.ts]


//// [/bin/a.ts]


//// [/tsconfig.json]
{
                "compilerOptions": {
                    "outDir": "bin"
                }
            }


configFileName:: tsconfig.json
CompilerOptions::
{
  "outDir": "/bin",
  "configFilePath": "/tsconfig.json"
}

FileNames::
/b.ts
Errors::


Fs::
//// [/b.ts]


//// [/bin/a.ts]


//// [/tsconfig.json]
{
                "compilerOptions": {
                    "outDir": "bin"
                },
                "exclude": [ "obj" ]
            }


configFileName:: tsconfig.json
CompilerOptions::
{
  "outDir": "/bin",
  "configFilePath": "/tsconfig.json"
}

FileNames::
/b.ts,/bin/a.ts
Errors::

