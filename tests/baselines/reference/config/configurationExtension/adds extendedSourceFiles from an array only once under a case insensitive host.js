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


configFileName:: adds extendedSourceFiles from an array only once
ExtendedSourceFiles::
c:/dev/configs/extendsArrayFirst.json
c:/dev/configs/extendsArraySecond.json
c:/dev/configs/extendsArrayThird.json
c:/dev/configs/extendsArrayFourth.json
After reusing sourceFile ExtendedSourceFiles::
c:/dev/configs/extendsArrayFirst.json
c:/dev/configs/extendsArraySecond.json
c:/dev/configs/extendsArrayThird.json
c:/dev/configs/extendsArrayFourth.json