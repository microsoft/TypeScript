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
[91m● [0m [91mError[0m TS17010Unknown type acquisition option 'enableAutoDiscovy'.

