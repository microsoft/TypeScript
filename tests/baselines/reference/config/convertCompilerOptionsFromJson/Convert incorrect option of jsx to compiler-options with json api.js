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
[91merror[0m[90m TS6046: [0mArgument for '--jsx' option must be: 'preserve', 'react-native', 'react', 'react-jsx', 'react-jsxdev'.

