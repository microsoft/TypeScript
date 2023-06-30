Fs::
//// [/apath/a.ts]


//// [/apath/b.js]


//// [/apath/jsconfig.json]
{
 "typeAcquisition": {
  "enableAutoDiscovy": true
 }
}


configFileName:: jsconfig.json
TypeAcquisition::
{
 "enable": true,
 "include": [],
 "exclude": []
}
Errors::
[91m● [0m[96mjsconfig.json[0m:[93m3[0m:[93m3[0m   [91mError[0m TS17010
| "enableAutoDiscovy": true
  [91m▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔[0m
Unknown type acquisition option 'enableAutoDiscovy'.

