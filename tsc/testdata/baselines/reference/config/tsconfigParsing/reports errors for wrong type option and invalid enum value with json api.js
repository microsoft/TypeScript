Fs::
//// [/app.ts]


//// [/tsconfig.json]
{
			    "compilerOptions": {
				"target": "invalid value",
				"removeComments": "should be a boolean",
				"moduleResolution": "invalid value"
			    }
			}


configFileName:: tsconfig.json
CompilerOptions::
{
  "configFilePath": "/tsconfig.json"
}

FileNames::
/app.ts
Errors::
[91merror[0m[90m TS5024: [0mCompiler option 'removeComments' requires a value of type boolean.
