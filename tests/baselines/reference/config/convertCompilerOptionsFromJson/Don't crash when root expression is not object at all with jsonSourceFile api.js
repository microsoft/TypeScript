Fs::
//// [/apath/a.ts]


//// [/apath/b.js]


//// [/apath/tsconfig.json]
42


configFileName:: tsconfig.json
CompilerOptions::
{
 "configFilePath": "tsconfig.json"
}
Errors::
[91m● [0m[96mtsconfig.json[0m:[93m1[0m:[93m1[0m  [91mError[0m TS5092
| 42
  [91m▔▔[0m
The root value of a 'tsconfig.json' file must be an object.

