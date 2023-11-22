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


configFileName:: adds extendedSourceFiles from an array only once
ExtendedSourceFiles::
/dev/configs/extendsArrayFirst.json
/dev/configs/extendsArraySecond.json
/dev/configs/extendsArrayThird.json
/dev/configs/extendsArrayFourth.json
After reusing sourceFile ExtendedSourceFiles::
/dev/configs/extendsArrayFirst.json
/dev/configs/extendsArraySecond.json
/dev/configs/extendsArrayThird.json
/dev/configs/extendsArrayFourth.json