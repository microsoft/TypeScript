Fs::
//// [/apath/a.ts]


//// [/apath/b.js]


//// [/apath/tsconfig.json]
{
 "compilerOptions": {
  "module": "commonjs",
  "target": "es5",
  "noImplicitAny": false,
  "sourceMap": false,
  "jsx": ""
 }
}


configFileName:: tsconfig.json
CompilerOptions::
{
 "module": 1,
 "target": 1,
 "noImplicitAny": false,
 "sourceMap": false,
 "configFilePath": "tsconfig.json"
}
Errors::
[91m● [0m[96mtsconfig.json[0m:[93m7[0m:[93m10[0m  [91mError[0m TS6046
| "jsx": ""
  [91m       ▔▔[0m
Argument for '--jsx' option must be: 'preserve', 'react-native', 'react', 'react-jsx', 'react-jsxdev'.

