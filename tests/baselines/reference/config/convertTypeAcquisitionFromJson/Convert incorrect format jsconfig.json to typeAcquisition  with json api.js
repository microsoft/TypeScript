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
[91merror[0m[90m TS17010: [0mUnknown type acquisition option 'enableAutoDiscovy'.

