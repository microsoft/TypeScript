Fs::
//// [/dist/output.js]


//// [/node_modules/module.ts]


//// [/src/app.ts]


//// [/src/index.ts]


//// [/tsconfig.json]
{
				"extends": "./tsconfigWithExtends.json",
				"compilerOptions": {
				    "outDir": "./dist",
    				"strict": true,
    				"noImplicitAny": true,
					"baseUrl": "",
				},
			}

//// [/tsconfigWithExtends.json]
{
  "files": ["/src/index.ts", "/src/app.ts"],
  "include": ["/src/**/*"],
  "exclude": [],
  "ts-node": {
    "compilerOptions": {
      "module": "commonjs"
    },
    "transpileOnly": true
  }
}


configFileName:: tsconfig.json
CompilerOptions::
{
  "baseUrl": "/",
  "noImplicitAny": true,
  "outDir": "/dist",
  "strict": true,
  "configFilePath": "/tsconfig.json"
}

FileNames::
/src/index.ts,/src/app.ts
Errors::

