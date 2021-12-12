Input::
//// [/lib/lib.d.ts]


//// [/src/tsconfig.first.json]
{
	"extends": "./foobar.json",
	"compilerOptions": {
		"composite": true
	}
}

//// [/src/tsconfig.json]
{
	"compilerOptions": {
		"composite": true
	},
	"references": [
		{ "path": "./tsconfig.first.json" },
		{ "path": "./tsconfig.second.json" }
	]
}

//// [/src/tsconfig.second.json]
{
	"extends": "./foobar.json",
	"compilerOptions": {
		"composite": true
	}
}



Output::
/lib/tsc --b /src/tsconfig.json
Cannot read file '/src/foobar.json'.

No inputs were found in config file '/src/tsconfig.first.json'. Specified 'include' paths were '["**/*"]' and 'exclude' paths were '[]'.

Cannot read file '/src/foobar.json'.

No inputs were found in config file '/src/tsconfig.second.json'. Specified 'include' paths were '["**/*"]' and 'exclude' paths were '[]'.


Found 4 errors.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped


