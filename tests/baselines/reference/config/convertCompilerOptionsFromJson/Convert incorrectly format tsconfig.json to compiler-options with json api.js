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
[91merror[0m[90m TS5023: [0mUnknown compiler option 'modu'.

