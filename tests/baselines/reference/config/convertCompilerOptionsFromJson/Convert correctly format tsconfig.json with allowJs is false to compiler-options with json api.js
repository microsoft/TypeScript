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
    "allowJs": false,
    "lib": [
      "es5",
      "es2015.core",
      "es2015.symbol"
    ]
  }
}


configFileName:: tsconfig.json
CompilerOptions::
{
  "module": 1,
  "target": 1,
  "noImplicitAny": false,
  "sourceMap": false,
  "allowJs": false,
  "lib": [
    "lib.es5.d.ts",
    "lib.es2015.core.d.ts",
    "lib.es2015.symbol.d.ts"
  ],
  "configFilePath": "/apath/tsconfig.json"
}
Errors::

