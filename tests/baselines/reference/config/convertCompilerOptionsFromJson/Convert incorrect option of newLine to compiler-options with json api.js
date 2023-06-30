Fs::
//// [/apath/a.ts]


//// [/apath/b.js]


//// [/apath/tsconfig.json]
{
 "compilerOptions": {
  "newLine": "",
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
[91m● [0m [91mError[0m TS6046Argument for '--newLine' option must be: 'crlf', 'lf'.

