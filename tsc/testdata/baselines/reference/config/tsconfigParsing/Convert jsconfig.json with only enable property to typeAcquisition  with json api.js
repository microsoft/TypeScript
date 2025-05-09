Fs::
//// [/apath/a.ts]


//// [/apath/b.ts]


//// [/apath/jsconfig.json]
{
	"typeAcquisition": {
		"enable": false,
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
  "enable": false
}

FileNames::
/apath/a.ts,/apath/b.ts
Errors::

