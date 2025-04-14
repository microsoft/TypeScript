Fs::
//// [/dev/circular.json]
{
  "extends": "./circular2",
  "compilerOptions": {
    "module": "amd"
  }
}

//// [/dev/circular2.json]
{
  "extends": "./circular",
  "compilerOptions": {
    "module": "commonjs"
  }
}

//// [/dev/configs/base.json]
{
  "compilerOptions": {
    "allowJs": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}

//// [/dev/configs/extendsArrayFifth.json]
{
  "extends": [
    "./extendsArrayFirst",
    "./extendsArraySecond",
    "./extendsArrayThird",
    "./extendsArrayFourth"
  ],
  "files": []
}

//// [/dev/configs/extendsArrayFirst.json]
{
  "compilerOptions": {
    "allowJs": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}

//// [/dev/configs/extendsArrayFourth.json]
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

//// [/dev/configs/extendsArraySecond.json]
{
  "compilerOptions": {
    "module": "amd"
  },
  "include": [
    "../supplemental.*"
  ]
}

//// [/dev/configs/extendsArrayThird.json]
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

//// [/dev/configs/fifth.json]
{
  "extends": "./fourth",
  "include": [
    "../tests/utils.ts"
  ],
  "files": []
}

//// [/dev/configs/first/templateextends.json]
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

//// [/dev/configs/first.json]
{
  "extends": "./base",
  "compilerOptions": {
    "module": "commonjs"
  },
  "files": [
    "../main.ts"
  ]
}

//// [/dev/configs/fourth.json]
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

//// [/dev/configs/second/templateextends.json]
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

//// [/dev/configs/second.json]
{
  "extends": "./base",
  "compilerOptions": {
    "module": "amd"
  },
  "include": [
    "../supplemental.*"
  ]
}

//// [/dev/configs/template.json]
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

//// [/dev/configs/templateandextends.json]
{
  "extends": "./first/templateextends.json",
  "compilerOptions": {
    "strict": true,
    "baseUrl": "./src"
  }
}

//// [/dev/configs/tests.json]
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

//// [/dev/configs/third.json]
{
  "extends": "./second",
  "compilerOptions": {
    "module": null
  },
  "include": [
    "../supplemental.*"
  ]
}

//// [/dev/extends.json]
{
  "extends": 42
}

//// [/dev/extends2.json]
{
  "extends": "configs/base"
}

//// [/dev/extends3.json]
{
  "extends": ""
}

//// [/dev/extends4.json]
{
  "extends": [
    ""
  ]
}

//// [/dev/extendsArrayFails.json]
{
  "extends": [
    "./missingFile"
  ],
  "compilerOptions": {
    "types": []
  }
}

//// [/dev/extendsArrayFails2.json]
{
  "extends": [
    42
  ]
}

//// [/dev/failure.json]
{
  "extends": "./failure2.json",
  "compilerOptions": {
    "typeRoots": []
  }
}

//// [/dev/failure2.json]
{
  "excludes": [
    "*.js"
  ]
}

//// [/dev/main.ts]


//// [/dev/missing.json]
{
  "extends": "./missing2",
  "compilerOptions": {
    "types": []
  }
}

//// [/dev/node_modules/@foo/tsconfig/package.json]
{
  "name": "@foo/tsconfig",
  "version": "1.0.0",
  "exports": {
    ".": "./src/tsconfig.json"
  }
}

//// [/dev/node_modules/@foo/tsconfig/src/tsconfig.json]
{
  "compilerOptions": {
    "strict": true
  }
}

//// [/dev/node_modules/config-box/package.json]
{
  "name": "config-box",
  "version": "1.0.0",
  "tsconfig": "./strict.json"
}

//// [/dev/node_modules/config-box/strict.json]
{
  "compilerOptions": {
    "strict": true
  }
}

//// [/dev/node_modules/config-box/unstrict.json]
{
  "compilerOptions": {
    "strict": false
  }
}

//// [/dev/node_modules/config-box-implied/package.json]
{
  "name": "config-box-implied",
  "version": "1.0.0"
}

//// [/dev/node_modules/config-box-implied/tsconfig.json]
{
  "compilerOptions": {
    "strict": true
  }
}

//// [/dev/node_modules/config-box-implied/unstrict/tsconfig.json]
{
  "compilerOptions": {
    "strict": false
  }
}

//// [/dev/supplemental.ts]


//// [/dev/tests/baselines/first/output.ts]


//// [/dev/tests/scenarios/first.json]


//// [/dev/tests/unit/spec.ts]


//// [/dev/tests/utils.ts]


//// [/dev/tsconfig.extendsBox.json]
{
  "extends": "config-box",
  "files": [
    "main.ts"
  ]
}

//// [/dev/tsconfig.extendsBoxImplied.json]
{
  "extends": "config-box-implied",
  "files": [
    "main.ts"
  ]
}

//// [/dev/tsconfig.extendsBoxImpliedPath.json]
{
  "extends": "config-box-implied/tsconfig.json",
  "files": [
    "main.ts"
  ]
}

//// [/dev/tsconfig.extendsBoxImpliedUnstrict.json]
{
  "extends": "config-box-implied/unstrict",
  "files": [
    "main.ts"
  ]
}

//// [/dev/tsconfig.extendsBoxImpliedUnstrictExtension.json]
{
  "extends": "config-box-implied/unstrict/tsconfig",
  "files": [
    "main.ts"
  ]
}

//// [/dev/tsconfig.extendsFoo.json]
{
  "extends": "@foo/tsconfig",
  "files": [
    "main.ts"
  ]
}

//// [/dev/tsconfig.extendsStrict.json]
{
  "extends": "config-box/strict",
  "files": [
    "main.ts"
  ]
}

//// [/dev/tsconfig.extendsStrictExtension.json]
{
  "extends": "config-box/strict.json",
  "files": [
    "main.ts"
  ]
}

//// [/dev/tsconfig.extendsUnStrict.json]
{
  "extends": "config-box/unstrict",
  "files": [
    "main.ts"
  ]
}

//// [/dev/tsconfig.json]
{
  "extends": "./configs/base",
  "files": [
    "main.ts",
    "supplemental.ts"
  ]
}

//// [/dev/tsconfig.nostrictnull.json]
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
  "configFilePath": "/dev/tsconfig.json"
}
FileNames::
/dev/main.ts
/dev/supplemental.ts
Errors::


can resolve an extension with a base extension that overrides options
configFileName:: tsconfig.nostrictnull.json
CompilerOptions::
{
  "allowJs": true,
  "noImplicitAny": true,
  "strictNullChecks": false,
  "configFilePath": "/dev/tsconfig.nostrictnull.json"
}
FileNames::
/dev/main.ts
/dev/supplemental.ts
Errors::


can report errors on circular imports
configFileName:: circular.json
CompilerOptions::
{
  "module": 2,
  "configFilePath": "/dev/circular.json"
}
FileNames::
/dev/main.ts
/dev/supplemental.ts
/dev/tests/utils.ts
/dev/tests/baselines/first/output.ts
/dev/tests/unit/spec.ts
Errors::
[91merror[0m[90m TS18000: [0mCircularity detected while resolving configuration: /dev/circular.json -> /dev/circular2.json -> /dev/circular.json


can report missing configurations
configFileName:: missing.json
CompilerOptions::
{
  "types": [],
  "configFilePath": "/dev/missing.json"
}
FileNames::
/dev/main.ts
/dev/supplemental.ts
/dev/tests/utils.ts
/dev/tests/baselines/first/output.ts
/dev/tests/unit/spec.ts
Errors::
[91merror[0m[90m TS6053: [0mFile './missing2' not found.


can report errors in extended configs
configFileName:: failure.json
CompilerOptions::
{
  "typeRoots": [],
  "configFilePath": "/dev/failure.json"
}
FileNames::
/dev/main.ts
/dev/supplemental.ts
/dev/tests/utils.ts
/dev/tests/baselines/first/output.ts
/dev/tests/unit/spec.ts
Errors::
[96mfailure2.json[0m:[93m2[0m:[93m3[0m - [91merror[0m[90m TS6114: [0mUnknown option 'excludes'. Did you mean 'exclude'?

[7m2[0m   "excludes": [
[7m [0m [91m  ~~~~~~~~~~[0m


can error when 'extends' is not a string or Array
configFileName:: extends.json
CompilerOptions::
{
  "configFilePath": "/dev/extends.json"
}
FileNames::
/dev/main.ts
/dev/supplemental.ts
/dev/tests/utils.ts
/dev/tests/baselines/first/output.ts
/dev/tests/unit/spec.ts
Errors::
[91merror[0m[90m TS5024: [0mCompiler option 'extends' requires a value of type string or Array.


can error when 'extends' is given an empty string
configFileName:: extends3.json
CompilerOptions::
{
  "configFilePath": "/dev/extends3.json"
}
FileNames::
/dev/main.ts
/dev/supplemental.ts
/dev/tests/utils.ts
/dev/tests/baselines/first/output.ts
/dev/tests/unit/spec.ts
Errors::
[91merror[0m[90m TS18051: [0mCompiler option 'extends' cannot be given an empty string.


can error when 'extends' is given an empty string in an array
configFileName:: extends4.json
CompilerOptions::
{
  "configFilePath": "/dev/extends4.json"
}
FileNames::
/dev/main.ts
/dev/supplemental.ts
/dev/tests/utils.ts
/dev/tests/baselines/first/output.ts
/dev/tests/unit/spec.ts
Errors::
[91merror[0m[90m TS18051: [0mCompiler option 'extends' cannot be given an empty string.


can overwrite compiler options using extended 'null'
configFileName:: configs/third.json
CompilerOptions::
{
  "allowJs": true,
  "noImplicitAny": true,
  "strictNullChecks": true,
  "configFilePath": "/dev/configs/third.json"
}
FileNames::
/dev/supplemental.ts
Errors::


can overwrite top-level options using extended 'null'
configFileName:: configs/fourth.json
CompilerOptions::
{
  "allowJs": true,
  "noImplicitAny": true,
  "strictNullChecks": true,
  "module": 4,
  "configFilePath": "/dev/configs/fourth.json"
}
FileNames::
/dev/main.ts
/dev/supplemental.ts
Errors::


can overwrite top-level files using extended []
configFileName:: configs/fifth.json
CompilerOptions::
{
  "allowJs": true,
  "noImplicitAny": true,
  "strictNullChecks": true,
  "module": 4,
  "configFilePath": "/dev/configs/fifth.json"
}
FileNames::
/dev/tests/utils.ts
Errors::


can lookup via tsconfig field
configFileName:: tsconfig.extendsBox.json
CompilerOptions::
{
  "strict": true,
  "configFilePath": "/dev/tsconfig.extendsBox.json"
}
FileNames::
/dev/main.ts
Errors::


can lookup via package-relative path
configFileName:: tsconfig.extendsStrict.json
CompilerOptions::
{
  "strict": true,
  "configFilePath": "/dev/tsconfig.extendsStrict.json"
}
FileNames::
/dev/main.ts
Errors::


can lookup via non-redirected-to package-relative path
configFileName:: tsconfig.extendsUnStrict.json
CompilerOptions::
{
  "strict": false,
  "configFilePath": "/dev/tsconfig.extendsUnStrict.json"
}
FileNames::
/dev/main.ts
Errors::


can lookup via package-relative path with extension
configFileName:: tsconfig.extendsStrictExtension.json
CompilerOptions::
{
  "strict": true,
  "configFilePath": "/dev/tsconfig.extendsStrictExtension.json"
}
FileNames::
/dev/main.ts
Errors::


can lookup via an implicit tsconfig
configFileName:: tsconfig.extendsBoxImplied.json
CompilerOptions::
{
  "strict": true,
  "configFilePath": "/dev/tsconfig.extendsBoxImplied.json"
}
FileNames::
/dev/main.ts
Errors::


can lookup via an implicit tsconfig in a package-relative directory
configFileName:: tsconfig.extendsBoxImpliedUnstrict.json
CompilerOptions::
{
  "strict": false,
  "configFilePath": "/dev/tsconfig.extendsBoxImpliedUnstrict.json"
}
FileNames::
/dev/main.ts
Errors::


can lookup via an implicit tsconfig in a package-relative directory with name
configFileName:: tsconfig.extendsBoxImpliedUnstrictExtension.json
CompilerOptions::
{
  "strict": false,
  "configFilePath": "/dev/tsconfig.extendsBoxImpliedUnstrictExtension.json"
}
FileNames::
/dev/main.ts
Errors::


can lookup via an implicit tsconfig in a package-relative directory with extension
configFileName:: tsconfig.extendsBoxImpliedPath.json
CompilerOptions::
{
  "strict": true,
  "configFilePath": "/dev/tsconfig.extendsBoxImpliedPath.json"
}
FileNames::
/dev/main.ts
Errors::


can lookup via an package.json exports
configFileName:: tsconfig.extendsFoo.json
CompilerOptions::
{
  "strict": true,
  "configFilePath": "/dev/tsconfig.extendsFoo.json"
}
FileNames::
/dev/main.ts
Errors::


can overwrite top-level compilerOptions
configFileName:: configs/extendsArrayFifth.json
CompilerOptions::
{
  "allowJs": true,
  "noImplicitAny": false,
  "strictNullChecks": false,
  "module": 4,
  "configFilePath": "/dev/configs/extendsArrayFifth.json"
}
FileNames::
/dev/supplemental.ts
Errors::


can report missing configurations
configFileName:: extendsArrayFails.json
CompilerOptions::
{
  "types": [],
  "configFilePath": "/dev/extendsArrayFails.json"
}
FileNames::
/dev/main.ts
/dev/supplemental.ts
/dev/tests/utils.ts
/dev/tests/baselines/first/output.ts
/dev/tests/unit/spec.ts
Errors::
[91merror[0m[90m TS6053: [0mFile './missingFile' not found.


can error when 'extends' is not a string or Array2
configFileName:: extendsArrayFails2.json
CompilerOptions::
{
  "configFilePath": "/dev/extendsArrayFails2.json"
}
FileNames::
/dev/main.ts
/dev/supplemental.ts
/dev/tests/utils.ts
/dev/tests/baselines/first/output.ts
/dev/tests/unit/spec.ts
Errors::
[91merror[0m[90m TS5024: [0mCompiler option 'extends' requires a value of type string.


handle configDir template
configFileName:: configs/template.json
CompilerOptions::
{
  "declarationDir": "/dev/configs/decls",
  "rootDirs": [
    "/dev/configs/root1",
    "/dev/configs/root2",
    "/dev/configs/root3"
  ],
  "paths": {
    "something": [
      "/dev/configs/something"
    ],
    "something/*": [
      "/dev/configs/something/*"
    ],
    "other/*": [
      "./other/*"
    ]
  },
  "configFilePath": "/dev/configs/template.json",
  "pathsBasePath": "/dev/configs"
}
FileNames::
/dev/configs/main.ts
/dev/supplemental.ts
Errors::


handle configDir template
configFileName:: configs/templateandextends.json
CompilerOptions::
{
  "outDir": "/dev/configs/second/insecond",
  "declarationDir": "/dev/configs/decls",
  "paths": {
    "something": [
      "/dev/configs/something"
    ],
    "something/*": [
      "/dev/configs/something/*"
    ],
    "other/*": [
      "./other/*"
    ]
  },
  "pathsBasePath": "/dev/configs/second",
  "rootDirs": [
    "/dev/configs/first/root1",
    "/dev/configs/root2",
    "/dev/configs/first/root3"
  ],
  "strict": true,
  "baseUrl": "/dev/configs/src",
  "configFilePath": "/dev/configs/templateandextends.json"
}
FileNames::
/dev/configs/main.ts
/dev/supplemental.ts
Errors::

