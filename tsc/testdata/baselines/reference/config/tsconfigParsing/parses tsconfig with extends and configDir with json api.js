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
  "declarationDir": "/declarationDir",
  "outDir": "/outDir",
  "rootDir": "/rootDir",
  "tsBuildInfoFile": "/tsBuildInfoFile",
  "baseUrl": "/baseUrl",
  "outFile": "/outFile",
  "configFilePath": "/tsconfig.json"
}

TypeAcquisition::
{}

FileNames::
/src/app.ts,/src/index.ts
Errors::

