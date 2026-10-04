Fs::
//// [/apath/a.ts]


//// [/apath/b.ts]


//// [/apath/tsconfig.json]
{
	"typeAcquisition": {
		"enable": true,
		"include": ["0.d.ts", "1.d.ts"],
		"exclude": ["0.js", "1.js"],
	},
}


configFileName:: tsconfig.json
CompilerOptions::
{
  "configFilePath": "/apath/tsconfig.json"
}

TypeAcquisition::
{
  "enable": true,
  "include": [
    "0.d.ts",
    "1.d.ts"
  ],
  "exclude": [
    "0.js",
    "1.js"
  ]
}

FileNames::
/apath/a.ts,/apath/b.ts
Errors::

