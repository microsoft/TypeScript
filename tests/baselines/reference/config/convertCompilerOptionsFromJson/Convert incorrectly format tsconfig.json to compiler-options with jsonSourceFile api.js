Fs::
//// [/apath/a.ts]


//// [/apath/b.js]


//// [/apath/tsconfig.json]
{
 "compilerOptions": {
  "modu": "commonjs"
 }
}


configFileName:: tsconfig.json
CompilerOptions::
{
 "configFilePath": "tsconfig.json"
}
Errors::
[91m● [0m[96mtsconfig.json[0m:[93m3[0m:[93m3[0m  [91mError[0m TS5023
| "modu": "commonjs"
  [91m▔▔▔▔▔▔[0m
Unknown compiler option 'modu'.

