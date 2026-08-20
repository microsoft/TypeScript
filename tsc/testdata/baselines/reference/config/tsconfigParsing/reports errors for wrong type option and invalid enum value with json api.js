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
FileNames::
/app.ts
Errors::
[91merror[0m[90m TS6046: [0mArgument for '--target' option must be: 'es6', 'es2015', 'es2016', 'es2017', 'es2018', 'es2019', 'es2020', 'es2021', 'es2022', 'es2023', 'es2024', 'es2025', 'esnext'.
[91merror[0m[90m TS5024: [0mCompiler option 'removeComments' requires a value of type boolean.
[91merror[0m[90m TS6046: [0mArgument for '--moduleResolution' option must be: 'node16', 'nodenext', 'bundler'.
