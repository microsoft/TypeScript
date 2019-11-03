//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsPackageJson.ts] ////

//// [index.js]
const j = require("./package.json");
module.exports = j;
//// [package.json]
{
    "name": "pkg",
    "version": "0.1.0",
    "description": "A package",
    "main": "./dist/index.js",
    "bin": {
      "cli": "./bin/cli.js",
    },
    "engines": {
      "node": ">=0"
    },
    "scripts": {
      "scriptname": "run && run again",
    },
    "devDependencies": {
      "@ns/dep": "0.1.2",
    },
    "dependencies": {
      "dep": "1.2.3",
    },
    "repository": "microsoft/TypeScript",
    "keywords": [
      "kw"
    ],
    "author": "Auth",
    "license": "See Licensce",
    "homepage": "https://site",
    "config": {
      "o": ["a"]
    }
}
  

//// [package.json]
{
    "name": "pkg",
    "version": "0.1.0",
    "description": "A package",
    "main": "./dist/index.js",
    "bin": {
        "cli": "./bin/cli.js"
    },
    "engines": {
        "node": ">=0"
    },
    "scripts": {
        "scriptname": "run && run again"
    },
    "devDependencies": {
        "@ns/dep": "0.1.2"
    },
    "dependencies": {
        "dep": "1.2.3"
    },
    "repository": "microsoft/TypeScript",
    "keywords": [
        "kw"
    ],
    "author": "Auth",
    "license": "See Licensce",
    "homepage": "https://site",
    "config": {
        "o": ["a"]
    }
}
//// [index.js]
var j = require("./package.json");
module.exports = j;


//// [package.d.ts]
export declare const name: string;
export declare const version: string;
export declare const description: string;
export declare const main: string;
export declare namespace bin {
    export const cli: string;
}
export declare namespace engines {
    export const node: string;
}
export declare namespace scripts {
    export const scriptname: string;
}
export declare const devDependencies: {
    "@ns/dep": string;
};
export declare namespace dependencies {
    export const dep: string;
}
export declare const repository: string;
export declare const keywords: string[];
export declare const author: string;
export declare const license: string;
export declare const homepage: string;
export declare namespace config {
    export const o: string[];
}
//// [index.d.ts]
export = j;
declare const j: {
    name: string;
    version: string;
    description: string;
    main: string;
    bin: {
        cli: string;
    };
    engines: {
        node: string;
    };
    scripts: {
        scriptname: string;
    };
    devDependencies: {
        "@ns/dep": string;
    };
    dependencies: {
        dep: string;
    };
    repository: string;
    keywords: string[];
    author: string;
    license: string;
    homepage: string;
    config: {
        o: string[];
    };
};
