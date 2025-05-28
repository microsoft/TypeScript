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
[91merror[0m[90m TS17010: [0mUnknown type acquisition option 'enableAutoDiscovy'.
