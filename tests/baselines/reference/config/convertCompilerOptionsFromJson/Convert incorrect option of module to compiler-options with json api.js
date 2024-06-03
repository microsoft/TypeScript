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
  "configFilePath": "/apath/tsconfig.json"
}
Errors::
[91merror[0m[90m TS6046: [0mArgument for '--module' option must be: 'None', 'CommonJS', 'AMD', 'System', 'UMD', 'ES2015', 'ES6', 'ES2020', 'ES2022', 'ESNext', 'Node16', 'NodeNext', 'Preserve'.

