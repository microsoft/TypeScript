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
[91merror[0m[90m TS6046: [0mArgument for '--module' option must be: 'none', 'commonjs', 'amd', 'system', 'umd', 'es6', 'es2015', 'es2020', 'es2022', 'esnext', 'node16', 'nodenext'.

