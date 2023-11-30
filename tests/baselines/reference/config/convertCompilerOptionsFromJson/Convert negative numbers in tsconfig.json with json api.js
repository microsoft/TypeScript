Fs::
//// [/apath/a.ts]


//// [/apath/b.js]


//// [/apath/tsconfig.json]
{
  "compilerOptions": {
    "allowJs": true,
    "maxNodeModuleJsDepth": -1
  }
}


configFileName:: tsconfig.json
CompilerOptions::
{
  "allowJs": true,
  "maxNodeModuleJsDepth": -1,
  "configFilePath": "tsconfig.json"
}
Errors::

