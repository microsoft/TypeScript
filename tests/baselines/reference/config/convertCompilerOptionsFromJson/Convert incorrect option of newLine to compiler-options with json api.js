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
  "configFilePath": "/apath/tsconfig.json"
}
Errors::
[91merror[0m[90m TS6046: [0mArgument for '--newLine' option must be: 'crlf', 'lf'.

