// @filename: /parent/tsconfig.json
{
    "files": [],
    "references": [{ "path": "../child" }]
  }
  
  // @filename: /child/tsconfig.json
  {
    "compilerOptions": {
      "declaration": true,
      "declarationDir": "out",
      "composite": true
    },
    "include": ["index.ts"]
  }
  
  // @filename: /child/index.ts
  export const childConst = "I am child!";
  