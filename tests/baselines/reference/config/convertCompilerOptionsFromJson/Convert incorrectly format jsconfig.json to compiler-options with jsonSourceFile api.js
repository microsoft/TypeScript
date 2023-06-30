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
[91m● [0m[96mjsconfig.json[0m:[93m3[0m:[93m3[0m  [91mError[0m TS5023
| "modu": "commonjs"
  [91m▔▔▔▔▔▔[0m
Unknown compiler option 'modu'.

