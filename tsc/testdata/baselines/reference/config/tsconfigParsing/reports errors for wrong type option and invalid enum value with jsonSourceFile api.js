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
[96mtsconfig.json[0m:[93m3[0m:[93m15[0m - [91merror[0m[90m TS6046: [0mArgument for '--target' option must be: 'es5', 'es6', 'es2015', 'es2016', 'es2017', 'es2018', 'es2019', 'es2020', 'es2021', 'es2022', 'es2023', 'es2024', 'esnext'.

[7m3[0m     "target": "invalid value",
[7m [0m [91m              ~~~~~~~~~~~~~~~[0m

[96mtsconfig.json[0m:[93m4[0m:[93m23[0m - [91merror[0m[90m TS5024: [0mCompiler option 'removeComments' requires a value of type boolean.

[7m4[0m     "removeComments": "should be a boolean",
[7m [0m [91m                      ~~~~~~~~~~~~~~~~~~~~~[0m

[96mtsconfig.json[0m:[93m5[0m:[93m25[0m - [91merror[0m[90m TS6046: [0mArgument for '--moduleResolution' option must be: 'node16', 'nodenext', 'bundler'.

[7m5[0m     "moduleResolution": "invalid value"
[7m [0m [91m                        ~~~~~~~~~~~~~~~[0m

