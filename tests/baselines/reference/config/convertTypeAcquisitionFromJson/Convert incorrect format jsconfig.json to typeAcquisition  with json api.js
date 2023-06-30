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
[91m● [0m [91mError[0m TS17010Unknown type acquisition option 'enableAutoDiscovy'.

