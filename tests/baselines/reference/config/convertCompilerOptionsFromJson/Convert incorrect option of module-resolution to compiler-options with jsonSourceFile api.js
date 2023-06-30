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
[91m● [0m[96mtsconfig.json[0m:[93m3[0m:[93m23[0m  [91mError[0m TS6046
  [91m[7m [0m [91m                    ▔▔[0m
Argument for '--moduleResolution' option must be: 'node10', 'classic', 'node16', 'nodenext', 'bundler'.


  [91m[7m [0m [91m                    ▔▔[0m
