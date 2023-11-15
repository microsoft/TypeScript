Fs::
//// [/apath/a.ts]


//// [/apath/b.js]


//// [/apath/tsconfig.json]
{
  "compilerOptions": {
    "moduleResolution": "",
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
[91merror[0m[90m TS6046: [0mArgument for '--moduleResolution' option must be: 'node10', 'classic', 'node16', 'nodenext', 'bundler'.

