Fs::
//// [/a.ts]


//// [/declarations/a.d.ts]


//// [/tsconfig.json]
{
                "compilerOptions": {
                    "declarationDir": "declarations"
                }
            }


configFileName:: tsconfig.json
FileNames::
/a.ts
Errors::


Fs::
//// [/a.ts]


//// [/declarations/a.d.ts]


//// [/tsconfig.json]
{
                "compilerOptions": {
                    "declarationDir": "declarations"
                },
                "exclude": [ "types" ]
            }


configFileName:: tsconfig.json
FileNames::
/a.ts,/declarations/a.d.ts
Errors::

