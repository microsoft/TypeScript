Fs::
//// [/dist/output.js]


//// [/node_modules/module.ts]


//// [/src/app.ts]


//// [/src/index.ts]


//// [/tsconfig.base.json]
{
  "compilerOptions": {
    "outFile": "${configDir}/outFile",
    "outDir": "${configDir}/outDir",
    "rootDir": "${configDir}/rootDir",
    "tsBuildInfoFile": "${configDir}/tsBuildInfoFile",
    "baseUrl": "${configDir}/baseUrl",
    "declarationDir": "${configDir}/declarationDir",
  }
}

//// [/tsconfig.json]
{
				"extends": "./tsconfig.base.json"
			}


configFileName:: tsconfig.json
CompilerOptions::
{
  "baseUrl": "/baseUrl",
  "declarationDir": "/declarationDir",
  "outDir": "/outDir",
  "outFile": "/outFile",
  "rootDir": "/rootDir",
  "tsBuildInfoFile": "/tsBuildInfoFile",
  "configFilePath": "/tsconfig.json"
}

FileNames::
/src/app.ts,/src/index.ts
Errors::

