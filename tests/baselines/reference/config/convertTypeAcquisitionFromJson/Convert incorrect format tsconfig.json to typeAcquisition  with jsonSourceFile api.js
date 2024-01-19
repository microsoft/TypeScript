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
[96mtsconfig.json[0m:[93m3[0m:[93m5[0m - [91merror[0m[90m TS17010: [0mUnknown type acquisition option 'enableAutoDiscovy'.

[7m3[0m     "enableAutoDiscovy": true
[7m [0m [91m    ~~~~~~~~~~~~~~~~~~~[0m

