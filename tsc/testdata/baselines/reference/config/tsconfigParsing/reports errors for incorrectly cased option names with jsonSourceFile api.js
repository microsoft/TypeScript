Fs::
//// [/app.ts]


//// [/tsconfig.json]
{
			    "compilerOptions": {
				"sourcemap": true,
				"declarationmap": true,
				"nouncheckedindexedaccess": true,
				"exactoptionalpropertytypes": true,
				"verbatimmodulesyntax": true,
				"isolatedmodules": true,
				"nouncheckedsideeffectimports": true,
				"moduledetection": "force",
				"skiplibcheck": true,
				"checkjs": true
			    }
			}


configFileName:: tsconfig.json
CompilerOptions::
{
  "configFilePath": "/tsconfig.json"
}

TypeAcquisition::
{}

FileNames::
/app.ts
Errors::
[96mtsconfig.json[0m:[93m3[0m:[93m5[0m - [91merror[0m[90m TS5025: [0mUnknown compiler option 'sourcemap'. Did you mean 'sourceMap'?

[7m3[0m     "sourcemap": true,
[7m [0m [91m    ~~~~~~~~~~~[0m

[96mtsconfig.json[0m:[93m4[0m:[93m5[0m - [91merror[0m[90m TS5025: [0mUnknown compiler option 'declarationmap'. Did you mean 'declarationMap'?

[7m4[0m     "declarationmap": true,
[7m [0m [91m    ~~~~~~~~~~~~~~~~[0m

[96mtsconfig.json[0m:[93m5[0m:[93m5[0m - [91merror[0m[90m TS5025: [0mUnknown compiler option 'nouncheckedindexedaccess'. Did you mean 'noUncheckedIndexedAccess'?

[7m5[0m     "nouncheckedindexedaccess": true,
[7m [0m [91m    ~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mtsconfig.json[0m:[93m6[0m:[93m5[0m - [91merror[0m[90m TS5025: [0mUnknown compiler option 'exactoptionalpropertytypes'. Did you mean 'exactOptionalPropertyTypes'?

[7m6[0m     "exactoptionalpropertytypes": true,
[7m [0m [91m    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mtsconfig.json[0m:[93m7[0m:[93m5[0m - [91merror[0m[90m TS5025: [0mUnknown compiler option 'verbatimmodulesyntax'. Did you mean 'verbatimModuleSyntax'?

[7m7[0m     "verbatimmodulesyntax": true,
[7m [0m [91m    ~~~~~~~~~~~~~~~~~~~~~~[0m

[96mtsconfig.json[0m:[93m8[0m:[93m5[0m - [91merror[0m[90m TS5025: [0mUnknown compiler option 'isolatedmodules'. Did you mean 'isolatedModules'?

[7m8[0m     "isolatedmodules": true,
[7m [0m [91m    ~~~~~~~~~~~~~~~~~[0m

[96mtsconfig.json[0m:[93m9[0m:[93m5[0m - [91merror[0m[90m TS5025: [0mUnknown compiler option 'nouncheckedsideeffectimports'. Did you mean 'noUncheckedSideEffectImports'?

[7m9[0m     "nouncheckedsideeffectimports": true,
[7m [0m [91m    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mtsconfig.json[0m:[93m10[0m:[93m5[0m - [91merror[0m[90m TS5025: [0mUnknown compiler option 'moduledetection'. Did you mean 'moduleDetection'?

[7m10[0m     "moduledetection": "force",
[7m  [0m [91m    ~~~~~~~~~~~~~~~~~[0m

[96mtsconfig.json[0m:[93m11[0m:[93m5[0m - [91merror[0m[90m TS5025: [0mUnknown compiler option 'skiplibcheck'. Did you mean 'skipLibCheck'?

[7m11[0m     "skiplibcheck": true,
[7m  [0m [91m    ~~~~~~~~~~~~~~[0m

[96mtsconfig.json[0m:[93m12[0m:[93m5[0m - [91merror[0m[90m TS5025: [0mUnknown compiler option 'checkjs'. Did you mean 'checkJs'?

[7m12[0m     "checkjs": true
[7m  [0m [91m    ~~~~~~~~~[0m

