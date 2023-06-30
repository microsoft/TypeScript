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
[91m● [0m [91mError[0m TS5023Unknown compiler option 'modu'.

