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
[91merror[0m[90m TS17010: [0mUnknown type acquisition option 'enableAutoDiscovy'.

