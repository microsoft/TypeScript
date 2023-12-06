Fs::
//// [/apath/a.ts]


//// [/apath/b.js]


//// [/apath/tsconfig.json]
[{
            "compilerOptions": {
                "target": "esnext"
            }
        }]


configFileName:: tsconfig.json
CompilerOptions::
{
  "target": 99,
  "configFilePath": "tsconfig.json"
}
Errors::
[96mtsconfig.json[0m:[93m1[0m:[93m1[0m - [91merror[0m[90m TS5092: [0mThe root value of a 'tsconfig.json' file must be an object.

[7m  1[0m [{
[7m   [0m [91m~~[0m
[7m  2[0m             "compilerOptions": {
[7m   [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[7m...[0m 
[7m  4[0m             }
[7m   [0m [91m~~~~~~~~~~~~~[0m
[7m  5[0m         }]
[7m   [0m [91m~~~~~~~~~~[0m

