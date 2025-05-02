Fs::
//// [/apath/a.ts]


//// [/apath/b.js]


//// [/apath/tsconfig.json]
{
  "compilerOptions": {
    "target": "",
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
[96mtsconfig.json[0m:[93m3[0m:[93m15[0m - [91merror[0m[90m TS6046: [0mArgument for '--target' option must be: 'es5', 'es6', 'es2015', 'es2016', 'es2017', 'es2018', 'es2019', 'es2020', 'es2021', 'es2022', 'es2023', 'es2024', 'esnext'.

[7m3[0m     "target": "",
[7m [0m [91m              ~~[0m

