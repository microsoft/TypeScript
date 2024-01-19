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
[96mtsconfig.json[0m:[93m1[0m:[93m1[0m - [91merror[0m[90m TS5092: [0mThe root value of a 'tsconfig.json' file must be an object.

[7m1[0m 42
[7m [0m [91m~~[0m

