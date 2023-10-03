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
[96mtsconfig.json[0m:[93m1[0m:[93m1[0m - [91merror[0m[90m TS1136: [0mProperty assignment expected.

[7m1[0m blah {
[7m [0m [91m~~~~[0m

