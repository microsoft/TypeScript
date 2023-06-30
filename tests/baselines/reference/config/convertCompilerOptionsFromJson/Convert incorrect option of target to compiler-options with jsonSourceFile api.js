Fs::
//// [/apath/a.ts]


//// [/apath/b.js]


//// [/apath/tsconfig.json]
{
 "compilerOptions": {
  "target": "",
  "noImplicitAny": false,
  "sourceMap": false
 }
}


configFileName:: tsconfig.json
CompilerOptions::
{
 "noImplicitAny": false,
 "sourceMap": false,
 "configFilePath": "tsconfig.json"
}
Errors::
[91m● [0m[96mtsconfig.json[0m:[93m3[0m:[93m13[0m  [91mError[0m TS6046
| "target": "",
  [91m          ▔▔[0m
Argument for '--target' option must be: 'es3', 'es5', 'es6', 'es2015', 'es2016', 'es2017', 'es2018', 'es2019', 'es2020', 'es2021', 'es2022', 'esnext'.

