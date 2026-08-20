Fs::
//// [/apath/a.ts]


//// [/apath/b.ts]


//// [/apath/tsconfig.json]
{
	"typeAcquisition": {
		"enableAutoDiscovy": true,
	}
}


configFileName:: tsconfig.json
CompilerOptions::
{
  "configFilePath": "/apath/tsconfig.json"
}

TypeAcquisition::
{}

FileNames::
/apath/a.ts,/apath/b.ts
Errors::
[91merror[0m[90m TS17010: [0mUnknown type acquisition option 'enableAutoDiscovy'.
