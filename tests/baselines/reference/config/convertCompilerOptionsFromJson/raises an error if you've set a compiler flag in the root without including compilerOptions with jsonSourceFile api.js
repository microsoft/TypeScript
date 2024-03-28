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
[96mtsconfig.json[0m:[93m2[0m:[93m13[0m - [91merror[0m[90m TS6258: [0m'module' should be set inside the 'compilerOptions' object of the config json file

[7m2[0m             "module": "esnext",
[7m [0m [91m            ~~~~~~~~[0m

