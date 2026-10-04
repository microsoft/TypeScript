Fs::
//// [/apath/a.ts]


//// [/apath/b.ts]


//// [/apath/tsconfig.json]
{
	"typeAcquisition": {
		"enable": true,
	},
}


configFileName:: tsconfig.json
CompilerOptions::
{
  "configFilePath": "/apath/tsconfig.json"
}

TypeAcquisition::
{
  "enable": true
}

FileNames::
/apath/a.ts,/apath/b.ts
Errors::

