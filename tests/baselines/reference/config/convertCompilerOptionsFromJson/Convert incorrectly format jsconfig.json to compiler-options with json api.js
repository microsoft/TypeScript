Fs::
//// [/apath/a.ts]


//// [/apath/b.js]


//// [/apath/jsconfig.json]
{
  "compilerOptions": {
    "modu": "commonjs"
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
  "configFilePath": "jsconfig.json"
}
Errors::
[91merror[0m[90m TS5023: [0mUnknown compiler option 'modu'.

