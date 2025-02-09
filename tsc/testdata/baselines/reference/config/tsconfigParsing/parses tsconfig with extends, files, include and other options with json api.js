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
				},
			}

//// [/tsconfigWithExtends.json]
{
  "files": ["/src/index.ts", "/src/app.ts"],
  "include": ["/src/**/*"],
  "ts-node": {
    "compilerOptions": {
      "module": "commonjs"
    },
    "transpileOnly": true
  }
}


configFileName:: tsconfig.json
FileNames::
/src/index.ts,/src/app.ts
Errors::

