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
[96mtsconfig.json[0m:[93m5[0m:[93m21[0m - [91merror[0m[90m TS6114: [0mUnknown option 'excludes'. Did you mean 'exclude'?

[7m5[0m                     "excludes": [
[7m [0m [91m                    ~~~~~~~~~~[0m

