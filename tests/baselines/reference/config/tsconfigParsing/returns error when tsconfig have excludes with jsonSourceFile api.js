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
[91m● [0m[96mtsconfig.json[0m:[93m5[0m:[93m21[0m  [91mError[0m TS6114
| "excludes": [
  [91m▔▔▔▔▔▔▔▔▔▔[0m
Unknown option 'excludes'. Did you mean 'exclude'?

