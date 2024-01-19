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
[96mjsconfig.json[0m:[93m3[0m:[93m5[0m - [91merror[0m[90m TS5023: [0mUnknown compiler option 'modu'.

[7m3[0m     "modu": "commonjs"
[7m [0m [91m    ~~~~~~[0m

