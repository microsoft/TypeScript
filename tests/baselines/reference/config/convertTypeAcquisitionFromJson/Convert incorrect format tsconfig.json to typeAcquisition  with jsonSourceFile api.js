Fs::
//// [/apath/a.ts]


//// [/apath/b.js]


//// [/apath/tsconfig.json]
{
 "typeAcquisition": {
  "enableAutoDiscovy": true
 }
}


configFileName:: tsconfig.json
TypeAcquisition::
{
 "enable": false,
 "include": [],
 "exclude": []
}
Errors::
[91m● [0m[96mtsconfig.json[0m:[93m3[0m:[93m3[0m   [91mError[0m TS17010
  [91m[7m [0m [91m▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔[0m
Unknown type acquisition option 'enableAutoDiscovy'.


  [91m[7m [0m [91m▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔[0m
