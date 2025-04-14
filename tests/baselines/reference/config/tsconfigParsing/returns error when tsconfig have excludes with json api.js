Fs::
//// [/apath/foge.ts]


//// [/apath/test.ts]


//// [/apath/tsconfig.json]
{
                    "compilerOptions": {
                        "lib": ["es5"]
                    },
                    "excludes": [
                        "foge.ts"
                    ]
                }


configFileName:: tsconfig.json
FileNames::
/apath/foge.ts,/apath/test.ts
Errors::
[91merror[0m[90m TS6114: [0mUnknown option 'excludes'. Did you mean 'exclude'?

