Fs::
//// [/apath/a.ts]


//// [/apath/b.js]


//// [/apath/tsconfig.json]
{
            "module": "esnext",
        }


configFileName:: tsconfig.json
CompilerOptions::
{
 "configFilePath": "tsconfig.json"
}
Errors::
[91m● [0m[96mtsconfig.json[0m:[93m2[0m:[93m13[0m  [91mError[0m TS6258
| "module": "esnext",
  [91m▔▔▔▔▔▔▔▔[0m
'module' should be set inside the 'compilerOptions' object of the config json file

