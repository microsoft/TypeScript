Fs::
//// [/apath/a.ts]


//// [/apath/b.js]


//// [/apath/tsconfig.json]
{
            "compilerOptions": {
                "target": "esnext"
            }
        } blah


configFileName:: tsconfig.json
CompilerOptions::
{
 "target": 99,
 "configFilePath": "tsconfig.json"
}
Errors::
[91m● [0m[96mtsconfig.json[0m:[93m1[0m:[93m1[0m  [91mError[0m TS5092
| {
  [91m▔[0m
|             "compilerOptions": {
  [91m▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔[0m
[7m...[0m 
|             }
  [91m▔▔▔▔▔▔▔▔▔▔▔▔▔[0m
|         } blah
  [91m▔▔▔▔▔▔▔▔▔▔▔▔▔▔[0m
The root value of a 'tsconfig.json' file must be an object.

