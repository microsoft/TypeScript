Fs::
//// [/apath/a.ts]


//// [/apath/b.js]


//// [/apath/tsconfig.json]
blah {
            "compilerOptions": {
                "target": "esnext"
            }
        }


configFileName:: tsconfig.json
CompilerOptions::
{
 "target": 99,
 "configFilePath": "tsconfig.json"
}
Errors::
[91m● [0m[96mtsconfig.json[0m:[93m1[0m:[93m1[0m  [91mError[0m TS1136
| blah {
  [91m▔▔▔▔[0m
Property assignment expected.

