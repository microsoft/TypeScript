Fs::
//// [c:/dev/circular.json]
{
  "extends": "./circular2",
  "compilerOptions": {
    "module": "amd"
  }
}

//// [c:/dev/circular2.json]
{
  "extends": "./circular",
  "compilerOptions": {
    "module": "commonjs"
  }
}

//// [c:/dev/configs/base.json]
{
  "compilerOptions": {
    "allowJs": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}

//// [c:/dev/configs/extendsArrayFifth.json]
{
  "extends": [
    "./extendsArrayFirst",
    "./extendsArraySecond",
    "./extendsArrayThird",
    "./extendsArrayFourth"
  ],
  "files": []
}

//// [c:/dev/configs/extendsArrayFirst.json]
{
  "compilerOptions": {
    "allowJs": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}

//// [c:/dev/configs/extendsArrayFourth.json]
{
  "compilerOptions": {
    "module": "system",
    "strictNullChecks": false
  },
  "include": null,
  "files": [
    "../main.ts"
  ]
}

//// [c:/dev/configs/extendsArraySecond.json]
{
  "compilerOptions": {
    "module": "amd"
  },
  "include": [
    "../supplemental.*"
  ]
}

//// [c:/dev/configs/extendsArrayThird.json]
{
  "compilerOptions": {
    "module": null,
    "noImplicitAny": false
  },
  "extends": "./extendsArrayFirst",
  "include": [
    "../supplemental.*"
  ]
}

//// [c:/dev/configs/fifth.json]
{
  "extends": "./fourth",
  "include": [
    "../tests/utils.ts"
  ],
  "files": []
}

//// [c:/dev/configs/first/templateextends.json]
{
  "extends": "../second/templateextends.json",
  "include": [
    "${configDir}/../supplemental.*"
  ],
  "compilerOptions": {
    "rootDirs": [
      "root1",
      "${configDir}/root2",
      "root3"
    ]
  }
}

//// [c:/dev/configs/first.json]
{
  "extends": "./base",
  "compilerOptions": {
    "module": "commonjs"
  },
  "files": [
    "../main.ts"
  ]
}

//// [c:/dev/configs/fourth.json]
{
  "extends": "./third",
  "compilerOptions": {
    "module": "system"
  },
  "include": null,
  "files": [
    "../main.ts"
  ]
}

//// [c:/dev/configs/second/templateextends.json]
{
  "files": [
    "${configDir}/main.ts"
  ],
  "compilerOptions": {
    "outDir": "./insecond",
    "declarationDir": "${configDir}/decls",
    "paths": {
      "something": [
        "${configDir}/something"
      ],
      "something/*": [
        "${configDir}/something/*"
      ],
      "other/*": [
        "./other/*"
      ]
    }
  }
}

//// [c:/dev/configs/second.json]
{
  "extends": "./base",
  "compilerOptions": {
    "module": "amd"
  },
  "include": [
    "../supplemental.*"
  ]
}

//// [c:/dev/configs/template.json]
{
  "include": [
    "${configDir}/../supplemental.*"
  ],
  "files": [
    "${configDir}/main.ts"
  ],
  "compilerOptions": {
    "declarationDir": "${configDir}/decls",
    "rootDirs": [
      "root1",
      "${configDir}/root2",
      "root3"
    ],
    "paths": {
      "something": [
        "${configDir}/something"
      ],
      "something/*": [
        "${configDir}/something/*"
      ],
      "other/*": [
        "./other/*"
      ]
    }
  }
}

//// [c:/dev/configs/templateandextends.json]
{
  "extends": "./first/templateextends.json",
  "compilerOptions": {
    "strict": true,
    "baseUrl": "./src"
  }
}

//// [c:/dev/configs/tests.json]
{
  "compilerOptions": {
    "preserveConstEnums": true,
    "removeComments": false,
    "sourceMap": true
  },
  "exclude": [
    "../tests/baselines",
    "../tests/scenarios"
  ],
  "include": [
    "../tests/**/*.ts"
  ]
}

//// [c:/dev/configs/third.json]
{
  "extends": "./second",
  "compilerOptions": {
    "module": null
  },
  "include": [
    "../supplemental.*"
  ]
}

//// [c:/dev/extends.json]
{
  "extends": 42
}

//// [c:/dev/extends2.json]
{
  "extends": "configs/base"
}

//// [c:/dev/extends3.json]
{
  "extends": ""
}

//// [c:/dev/extends4.json]
{
  "extends": [
    ""
  ]
}

//// [c:/dev/extendsArrayFails.json]
{
  "extends": [
    "./missingFile"
  ],
  "compilerOptions": {
    "types": []
  }
}

//// [c:/dev/extendsArrayFails2.json]
{
  "extends": [
    42
  ]
}

//// [c:/dev/failure.json]
{
  "extends": "./failure2.json",
  "compilerOptions": {
    "typeRoots": []
  }
}

//// [c:/dev/failure2.json]
{
  "excludes": [
    "*.js"
  ]
}

//// [c:/dev/main.ts]


//// [c:/dev/missing.json]
{
  "extends": "./missing2",
  "compilerOptions": {
    "types": []
  }
}

//// [c:/dev/node_modules/@foo/tsconfig/package.json]
{
  "name": "@foo/tsconfig",
  "version": "1.0.0",
  "exports": {
    ".": "./src/tsconfig.json"
  }
}

//// [c:/dev/node_modules/@foo/tsconfig/src/tsconfig.json]
{
  "compilerOptions": {
    "strict": true
  }
}

//// [c:/dev/node_modules/config-box/package.json]
{
  "name": "config-box",
  "version": "1.0.0",
  "tsconfig": "./strict.json"
}

//// [c:/dev/node_modules/config-box/strict.json]
{
  "compilerOptions": {
    "strict": true
  }
}

//// [c:/dev/node_modules/config-box/unstrict.json]
{
  "compilerOptions": {
    "strict": false
  }
}

//// [c:/dev/node_modules/config-box-implied/package.json]
{
  "name": "config-box-implied",
  "version": "1.0.0"
}

//// [c:/dev/node_modules/config-box-implied/tsconfig.json]
{
  "compilerOptions": {
    "strict": true
  }
}

//// [c:/dev/node_modules/config-box-implied/unstrict/tsconfig.json]
{
  "compilerOptions": {
    "strict": false
  }
}

//// [c:/dev/supplemental.ts]


//// [c:/dev/tests/baselines/first/output.ts]


//// [c:/dev/tests/scenarios/first.json]


//// [c:/dev/tests/unit/spec.ts]


//// [c:/dev/tests/utils.ts]


//// [c:/dev/tsconfig.extendsBox.json]
{
  "extends": "config-box",
  "files": [
    "main.ts"
  ]
}

//// [c:/dev/tsconfig.extendsBoxImplied.json]
{
  "extends": "config-box-implied",
  "files": [
    "main.ts"
  ]
}

//// [c:/dev/tsconfig.extendsBoxImpliedPath.json]
{
  "extends": "config-box-implied/tsconfig.json",
  "files": [
    "main.ts"
  ]
}

//// [c:/dev/tsconfig.extendsBoxImpliedUnstrict.json]
{
  "extends": "config-box-implied/unstrict",
  "files": [
    "main.ts"
  ]
}

//// [c:/dev/tsconfig.extendsBoxImpliedUnstrictExtension.json]
{
  "extends": "config-box-implied/unstrict/tsconfig",
  "files": [
    "main.ts"
  ]
}

//// [c:/dev/tsconfig.extendsFoo.json]
{
  "extends": "@foo/tsconfig",
  "files": [
    "main.ts"
  ]
}

//// [c:/dev/tsconfig.extendsStrict.json]
{
  "extends": "config-box/strict",
  "files": [
    "main.ts"
  ]
}

//// [c:/dev/tsconfig.extendsStrictExtension.json]
{
  "extends": "config-box/strict.json",
  "files": [
    "main.ts"
  ]
}

//// [c:/dev/tsconfig.extendsUnStrict.json]
{
  "extends": "config-box/unstrict",
  "files": [
    "main.ts"
  ]
}

//// [c:/dev/tsconfig.json]
{
  "extends": "./configs/base",
  "files": [
    "main.ts",
    "supplemental.ts"
  ]
}

//// [c:/dev/tsconfig.nostrictnull.json]
{
  "extends": "./tsconfig",
  "compilerOptions": {
    "strictNullChecks": false
  }
}


can resolve an extension with a base extension
configFileName:: tsconfig.json
CompilerOptions::
{
  "allowJs": true,
  "noImplicitAny": true,
  "strictNullChecks": true,
  "configFilePath": "c:/dev/tsconfig.json"
}
FileNames::
c:/dev/main.ts
c:/dev/supplemental.ts
Errors::


can resolve an extension with a base extension that overrides options
configFileName:: tsconfig.nostrictnull.json
CompilerOptions::
{
  "allowJs": true,
  "noImplicitAny": true,
  "strictNullChecks": false,
  "configFilePath": "c:/dev/tsconfig.nostrictnull.json"
}
FileNames::
c:/dev/main.ts
c:/dev/supplemental.ts
Errors::


can report errors on circular imports
configFileName:: circular.json
CompilerOptions::
{
  "module": 2,
  "configFilePath": "c:/dev/circular.json"
}
FileNames::
c:/dev/main.ts
c:/dev/supplemental.ts
c:/dev/tests/utils.ts
c:/dev/tests/baselines/first/output.ts
c:/dev/tests/unit/spec.ts
Errors::
[91merror[0m[90m TS18000: [0mCircularity detected while resolving configuration: c:/dev/circular.json -> c:/dev/circular2.json -> c:/dev/circular.json


can report missing configurations
configFileName:: missing.json
CompilerOptions::
{
  "types": [],
  "configFilePath": "c:/dev/missing.json"
}
FileNames::
c:/dev/main.ts
c:/dev/supplemental.ts
c:/dev/tests/utils.ts
c:/dev/tests/baselines/first/output.ts
c:/dev/tests/unit/spec.ts
Errors::
[96mmissing.json[0m:[93m2[0m:[93m14[0m - [91merror[0m[90m TS6053: [0mFile './missing2' not found.

[7m2[0m   "extends": "./missing2",
[7m [0m [91m             ~~~~~~~~~~~~[0m


can report errors in extended configs
configFileName:: failure.json
CompilerOptions::
{
  "typeRoots": [],
  "configFilePath": "c:/dev/failure.json"
}
FileNames::
c:/dev/main.ts
c:/dev/supplemental.ts
c:/dev/tests/utils.ts
c:/dev/tests/baselines/first/output.ts
c:/dev/tests/unit/spec.ts
Errors::
[96mfailure2.json[0m:[93m2[0m:[93m3[0m - [91merror[0m[90m TS6114: [0mUnknown option 'excludes'. Did you mean 'exclude'?

[7m2[0m   "excludes": [
[7m [0m [91m  ~~~~~~~~~~[0m


can error when 'extends' is not a string or Array
configFileName:: extends.json
CompilerOptions::
{
  "configFilePath": "c:/dev/extends.json"
}
FileNames::
c:/dev/main.ts
c:/dev/supplemental.ts
c:/dev/tests/utils.ts
c:/dev/tests/baselines/first/output.ts
c:/dev/tests/unit/spec.ts
Errors::
[96mextends.json[0m:[93m2[0m:[93m14[0m - [91merror[0m[90m TS5024: [0mCompiler option 'extends' requires a value of type string or Array.

[7m2[0m   "extends": 42
[7m [0m [91m             ~~[0m


can error when 'extends' is given an empty string
configFileName:: extends3.json
CompilerOptions::
{
  "configFilePath": "c:/dev/extends3.json"
}
FileNames::
c:/dev/main.ts
c:/dev/supplemental.ts
c:/dev/tests/utils.ts
c:/dev/tests/baselines/first/output.ts
c:/dev/tests/unit/spec.ts
Errors::
[96mextends3.json[0m:[93m2[0m:[93m14[0m - [91merror[0m[90m TS18051: [0mCompiler option 'extends' cannot be given an empty string.

[7m2[0m   "extends": ""
[7m [0m [91m             ~~[0m


can error when 'extends' is given an empty string in an array
configFileName:: extends4.json
CompilerOptions::
{
  "configFilePath": "c:/dev/extends4.json"
}
FileNames::
c:/dev/main.ts
c:/dev/supplemental.ts
c:/dev/tests/utils.ts
c:/dev/tests/baselines/first/output.ts
c:/dev/tests/unit/spec.ts
Errors::
[96mextends4.json[0m:[93m3[0m:[93m5[0m - [91merror[0m[90m TS18051: [0mCompiler option 'extends' cannot be given an empty string.

[7m3[0m     ""
[7m [0m [91m    ~~[0m


can overwrite compiler options using extended 'null'
configFileName:: configs/third.json
CompilerOptions::
{
  "allowJs": true,
  "noImplicitAny": true,
  "strictNullChecks": true,
  "configFilePath": "c:/dev/configs/third.json"
}
FileNames::
c:/dev/supplemental.ts
Errors::


can overwrite top-level options using extended 'null'
configFileName:: configs/fourth.json
CompilerOptions::
{
  "allowJs": true,
  "noImplicitAny": true,
  "strictNullChecks": true,
  "module": 4,
  "configFilePath": "c:/dev/configs/fourth.json"
}
FileNames::
c:/dev/main.ts
c:/dev/supplemental.ts
Errors::


can overwrite top-level files using extended []
configFileName:: configs/fifth.json
CompilerOptions::
{
  "allowJs": true,
  "noImplicitAny": true,
  "strictNullChecks": true,
  "module": 4,
  "configFilePath": "c:/dev/configs/fifth.json"
}
FileNames::
c:/dev/tests/utils.ts
Errors::


can lookup via tsconfig field
configFileName:: tsconfig.extendsBox.json
CompilerOptions::
{
  "strict": true,
  "configFilePath": "c:/dev/tsconfig.extendsBox.json"
}
FileNames::
c:/dev/main.ts
Errors::


can lookup via package-relative path
configFileName:: tsconfig.extendsStrict.json
CompilerOptions::
{
  "strict": true,
  "configFilePath": "c:/dev/tsconfig.extendsStrict.json"
}
FileNames::
c:/dev/main.ts
Errors::


can lookup via non-redirected-to package-relative path
configFileName:: tsconfig.extendsUnStrict.json
CompilerOptions::
{
  "strict": false,
  "configFilePath": "c:/dev/tsconfig.extendsUnStrict.json"
}
FileNames::
c:/dev/main.ts
Errors::


can lookup via package-relative path with extension
configFileName:: tsconfig.extendsStrictExtension.json
CompilerOptions::
{
  "strict": true,
  "configFilePath": "c:/dev/tsconfig.extendsStrictExtension.json"
}
FileNames::
c:/dev/main.ts
Errors::


can lookup via an implicit tsconfig
configFileName:: tsconfig.extendsBoxImplied.json
CompilerOptions::
{
  "strict": true,
  "configFilePath": "c:/dev/tsconfig.extendsBoxImplied.json"
}
FileNames::
c:/dev/main.ts
Errors::


can lookup via an implicit tsconfig in a package-relative directory
configFileName:: tsconfig.extendsBoxImpliedUnstrict.json
CompilerOptions::
{
  "strict": false,
  "configFilePath": "c:/dev/tsconfig.extendsBoxImpliedUnstrict.json"
}
FileNames::
c:/dev/main.ts
Errors::


can lookup via an implicit tsconfig in a package-relative directory with name
configFileName:: tsconfig.extendsBoxImpliedUnstrictExtension.json
CompilerOptions::
{
  "strict": false,
  "configFilePath": "c:/dev/tsconfig.extendsBoxImpliedUnstrictExtension.json"
}
FileNames::
c:/dev/main.ts
Errors::


can lookup via an implicit tsconfig in a package-relative directory with extension
configFileName:: tsconfig.extendsBoxImpliedPath.json
CompilerOptions::
{
  "strict": true,
  "configFilePath": "c:/dev/tsconfig.extendsBoxImpliedPath.json"
}
FileNames::
c:/dev/main.ts
Errors::


can lookup via an package.json exports
configFileName:: tsconfig.extendsFoo.json
CompilerOptions::
{
  "strict": true,
  "configFilePath": "c:/dev/tsconfig.extendsFoo.json"
}
FileNames::
c:/dev/main.ts
Errors::


can overwrite top-level compilerOptions
configFileName:: configs/extendsArrayFifth.json
CompilerOptions::
{
  "allowJs": true,
  "noImplicitAny": false,
  "strictNullChecks": false,
  "module": 4,
  "configFilePath": "c:/dev/configs/extendsArrayFifth.json"
}
FileNames::
c:/dev/supplemental.ts
Errors::


can report missing configurations
configFileName:: extendsArrayFails.json
CompilerOptions::
{
  "types": [],
  "configFilePath": "c:/dev/extendsArrayFails.json"
}
FileNames::
c:/dev/main.ts
c:/dev/supplemental.ts
c:/dev/tests/utils.ts
c:/dev/tests/baselines/first/output.ts
c:/dev/tests/unit/spec.ts
Errors::
[96mextendsArrayFails.json[0m:[93m3[0m:[93m5[0m - [91merror[0m[90m TS6053: [0mFile './missingFile' not found.

[7m3[0m     "./missingFile"
[7m [0m [91m    ~~~~~~~~~~~~~~~[0m


can error when 'extends' is not a string or Array2
configFileName:: extendsArrayFails2.json
CompilerOptions::
{
  "configFilePath": "c:/dev/extendsArrayFails2.json"
}
FileNames::
c:/dev/main.ts
c:/dev/supplemental.ts
c:/dev/tests/utils.ts
c:/dev/tests/baselines/first/output.ts
c:/dev/tests/unit/spec.ts
Errors::
[96mextendsArrayFails2.json[0m:[93m3[0m:[93m5[0m - [91merror[0m[90m TS5024: [0mCompiler option 'extends' requires a value of type string.

[7m3[0m     42
[7m [0m [91m    ~~[0m


handle configDir template
configFileName:: configs/template.json
CompilerOptions::
{
  "declarationDir": "c:/dev/configs/decls",
  "rootDirs": [
    "c:/dev/configs/root1",
    "c:/dev/configs/root2",
    "c:/dev/configs/root3"
  ],
  "paths": {
    "something": [
      "c:/dev/configs/something"
    ],
    "something/*": [
      "c:/dev/configs/something/*"
    ],
    "other/*": [
      "./other/*"
    ]
  },
  "pathsBasePath": "c:/dev/configs",
  "configFilePath": "c:/dev/configs/template.json"
}
FileNames::
c:/dev/configs/main.ts
c:/dev/supplemental.ts
Errors::


handle configDir template
configFileName:: configs/templateandextends.json
CompilerOptions::
{
  "outDir": "c:/dev/configs/second/insecond",
  "declarationDir": "c:/dev/configs/decls",
  "paths": {
    "something": [
      "c:/dev/configs/something"
    ],
    "something/*": [
      "c:/dev/configs/something/*"
    ],
    "other/*": [
      "./other/*"
    ]
  },
  "pathsBasePath": "c:/dev/configs/second",
  "rootDirs": [
    "c:/dev/configs/first/root1",
    "c:/dev/configs/root2",
    "c:/dev/configs/first/root3"
  ],
  "strict": true,
  "baseUrl": "c:/dev/configs/src",
  "configFilePath": "c:/dev/configs/templateandextends.json"
}
FileNames::
c:/dev/configs/main.ts
c:/dev/supplemental.ts
Errors::

