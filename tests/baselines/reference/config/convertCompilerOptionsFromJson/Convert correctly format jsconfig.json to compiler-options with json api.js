Fs::
//// [/apath/a.ts]


//// [/apath/b.js]


//// [/apath/jsconfig.json]
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "es5",
    "noImplicitAny": false,
    "sourceMap": false,
    "lib": [
      "es5",
      "es2015.core",
      "es2015.symbol"
    ]
  }
}


configFileName:: jsconfig.json
CompilerOptions::
{
  "allowJs": true,
  "maxNodeModuleJsDepth": 2,
  "allowSyntheticDefaultImports": true,
  "skipLibCheck": true,
  "noEmit": true,
  "module": 1,
  "target": 1,
  "noImplicitAny": false,
  "sourceMap": false,
  "lib": [
    "lib.es5.d.ts",
    "lib.es2015.core.d.ts",
    "lib.es2015.symbol.d.ts"
  ],
  "configFilePath": "/apath/jsconfig.json"
}
Errors::

