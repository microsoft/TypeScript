Fs::
//// [/apath/a.ts]


//// [/apath/b.ts]


//// [/apath/jsconfig.json]
{
	"typeAcquisition": {
		"enableAutoDiscovy": true,
	},
}


configFileName:: jsconfig.json
CompilerOptions::
{
  "allowJs": true,
  "allowSyntheticDefaultImports": true,
  "noEmit": true,
  "skipLibCheck": true,
  "maxNodeModuleJsDepth": 2,
  "configFilePath": "/apath/jsconfig.json"
}

TypeAcquisition::
{
  "enable": true
}

FileNames::
/apath/a.ts,/apath/b.ts
Errors::
[96mjsconfig.json[0m:[93m3[0m:[93m3[0m - [91merror[0m[90m TS17010: [0mUnknown type acquisition option 'enableAutoDiscovy'.

[7m3[0m   "enableAutoDiscovy": true,
[7m [0m [91m  ~~~~~~~~~~~~~~~~~~~[0m

