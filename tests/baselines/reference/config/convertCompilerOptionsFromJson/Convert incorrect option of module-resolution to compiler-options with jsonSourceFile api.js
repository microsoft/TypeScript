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
  "configFilePath": "/apath/tsconfig.json"
}
Errors::
[96mtsconfig.json[0m:[93m3[0m:[93m25[0m - [91merror[0m[90m TS6046: [0mArgument for '--moduleResolution' option must be: 'node10', 'classic', 'node16', 'nodenext', 'bundler'.

[7m3[0m     "moduleResolution": "",
[7m [0m [91m                        ~~[0m

