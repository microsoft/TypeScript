Fs::
//// [/apath/a.ts]


//// [/apath/b.js]


//// [/apath/tsconfig.json]
{
 "compilerOptions": {
  "module": "",
  "target": "es5",
  "noImplicitAny": false,
  "sourceMap": false
 }
}


configFileName:: tsconfig.json
CompilerOptions::
{
 "target": 1,
 "noImplicitAny": false,
 "sourceMap": false,
 "configFilePath": "tsconfig.json"
}
Errors::
[91m● [0m[96mtsconfig.json[0m:[93m3[0m:[93m13[0m  [91mError[0m TS6046
| "module": "",
  [91m          ▔▔[0m
Argument for '--module' option must be: 'none', 'commonjs', 'amd', 'system', 'umd', 'es6', 'es2015', 'es2020', 'es2022', 'esnext', 'node16', 'nodenext'.

