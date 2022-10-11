/* eslint-disable */

/** Run via: 
    node scripts/createPlaygroundBuild.mjs
 */

// This script does two things: 
//  
//  - Listens to changes to the built version of TypeScript (via a filewatcher on `built/local/typescript.js`)
//    these trigger creating monaco-typescript compatible builds of TypeScript at `internal/lib/typescriptServices.js§
//
//  - Creates a HTTP server which the playground uses. The webserver almost exclusively re-directs requests to 
//    the latest stable version of monaco-typescript, but specifically overrides requests for the TypeScript js
//    file to the version created in the above step.
//

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import path from 'path';
import fs from 'fs';
import child_process from 'child_process';
import http from 'http';
import url from 'url';
import nodeFetch from "node-fetch";
import assert from 'assert';

const __filename = url.fileURLToPath(new URL(import.meta.url));
const __dirname = path.dirname(__filename);

function updateTSDist() {
  // This code is a direct port of a script from monaco-typescript
  // https://github.com/microsoft/monaco-editor/blob/main/build/importTypescript.ts
  // Currently based on https://github.com/microsoft/monaco-editor/pull/3356

  const generatedNote = `//
  // **NOTE**: Do not edit directly! This file is generated using \`npm run import-typescript\`
  //
  `;
  
  const TYPESCRIPT_LIB_SOURCE = path.join(__dirname, '../built/local');
  const TYPESCRIPT_LIB_DESTINATION = path.join(__dirname, '../internal/lib');
  
  (function () {
    try {
      fs.statSync(TYPESCRIPT_LIB_DESTINATION);
    } catch (err) {
      fs.mkdirSync(TYPESCRIPT_LIB_DESTINATION);
    }
    importLibs();
  
    const npmLsOutput = JSON.parse(
      child_process.execSync('npm ls typescript --depth=0 --json=true').toString()
    );
    const typeScriptDependencyVersion = npmLsOutput.version;
  
    fs.writeFileSync(
      path.join(TYPESCRIPT_LIB_DESTINATION, 'typescriptServicesMetadata.ts'),
      `${generatedNote}
  export const typescriptVersion = "${typeScriptDependencyVersion}";\n`
    );
  
    let tsServices = fs.readFileSync(path.join(TYPESCRIPT_LIB_SOURCE, 'typescript.js')).toString();

    // The output from this build will only be accessible via AMD or ESM; rather than removing
    // references to require/module, define them as dummy variables that bundlers will ignore.
    // The TS code can figure out that it's not running under Node even with these defined.
    tsServices =
    `
/* MONACOCHANGE */
var require = undefined;
var module = { exports: {} };
/* END MONACOCHANGE */
` + tsServices;

    const tsServices_amd =
      generatedNote +
      tsServices +
      `
// MONACOCHANGE
// Defining the entire module name because r.js has an issue and cannot bundle this file
// correctly with an anonymous define call
define("vs/language/typescript/lib/typescriptServices", [], function() { return ts; });
// END MONACOCHANGE
`;
    fs.writeFileSync(
      path.join(TYPESCRIPT_LIB_DESTINATION, 'typescriptServices-amd.js'),
      stripSourceMaps(tsServices_amd)
    );

    const tsServices_esm =
      generatedNote +
      tsServices +
      `
// MONACOCHANGE
export var createClassifier = ts.createClassifier;
export var createLanguageService = ts.createLanguageService;
export var displayPartsToString = ts.displayPartsToString;
export var EndOfLineState = ts.EndOfLineState;
export var flattenDiagnosticMessageText = ts.flattenDiagnosticMessageText;
export var IndentStyle = ts.IndentStyle;
export var ScriptKind = ts.ScriptKind;
export var ScriptTarget = ts.ScriptTarget;
export var TokenClass = ts.TokenClass;
export var typescript = ts;
// END MONACOCHANGE
`;
    fs.writeFileSync(
      path.join(TYPESCRIPT_LIB_DESTINATION, 'typescriptServices.js'),
      stripSourceMaps(tsServices_esm)
    );

    let dtsServices = fs.readFileSync(path.join(TYPESCRIPT_LIB_SOURCE, 'typescript.d.ts')).toString();

    fs.writeFileSync(
      path.join(TYPESCRIPT_LIB_DESTINATION, 'typescriptServices.d.ts'),
      generatedNote + dtsServices
    );
  })();
  
  function importLibs() {
    /**
     * @param {string} name 
     */
    function readLibFile(name) {
      const srcPath = path.join(TYPESCRIPT_LIB_SOURCE, name);
      return fs.readFileSync(srcPath).toString();
    }
  
    let strLibResult = `/*---------------------------------------------------------------------------------------------
   *  Copyright (c) Microsoft Corporation. All rights reserved.
   *  Licensed under the MIT License. See License.txt in the project root for license information.
   *--------------------------------------------------------------------------------------------*/
  ${generatedNote}
  /** Contains all the lib files */
  export const libFileMap: Record<string, string> = {}
  `;
    let strIndexResult = `/*---------------------------------------------------------------------------------------------
   *  Copyright (c) Microsoft Corporation. All rights reserved.
   *  Licensed under the MIT License. See License.txt in the project root for license information.
   *--------------------------------------------------------------------------------------------*/
  ${generatedNote}
  /** Contains all the lib files */
  export const libFileSet: Record<string, boolean> = {}
  `;
    const dtsFiles = fs.readdirSync(TYPESCRIPT_LIB_SOURCE).filter((f) => f.includes('lib.'));
    while (dtsFiles.length > 0) {
      const name = dtsFiles.shift();
      assert(name !== undefined);
      const output = readLibFile(name).replace(/\r\n/g, '\n');
      strLibResult += `libFileMap['${name}'] = "${escapeText(output)}";\n`;
      strIndexResult += `libFileSet['${name}'] = true;\n`;
    }
  
    fs.writeFileSync(path.join(TYPESCRIPT_LIB_DESTINATION, 'lib.ts'), strLibResult);
    fs.writeFileSync(path.join(TYPESCRIPT_LIB_DESTINATION, 'lib.index.ts'), strIndexResult);
  }
  
  /**
   * Escape text such that it can be used in a javascript string enclosed by double quotes (")
   * @param {string} text
   */
  function escapeText(text) {
    // See http://www.javascriptkit.com/jsref/escapesequence.shtml
    const _backspace = '\b'.charCodeAt(0);
    const _formFeed = '\f'.charCodeAt(0);
    const _newLine = '\n'.charCodeAt(0);
    const _nullChar = 0;
    const _carriageReturn = '\r'.charCodeAt(0);
    const _tab = '\t'.charCodeAt(0);
    const _verticalTab = '\v'.charCodeAt(0);
    const _backslash = '\\'.charCodeAt(0);
    const _doubleQuote = '"'.charCodeAt(0);
  
    const len = text.length;
    let startPos = 0;
    let chrCode;
    let replaceWith = null;
    let resultPieces = [];
  
    for (let i = 0; i < len; i++) {
      chrCode = text.charCodeAt(i);
      switch (chrCode) {
        case _backspace:
          replaceWith = '\\b';
          break;
        case _formFeed:
          replaceWith = '\\f';
          break;
        case _newLine:
          replaceWith = '\\n';
          break;
        case _nullChar:
          replaceWith = '\\0';
          break;
        case _carriageReturn:
          replaceWith = '\\r';
          break;
        case _tab:
          replaceWith = '\\t';
          break;
        case _verticalTab:
          replaceWith = '\\v';
          break;
        case _backslash:
          replaceWith = '\\\\';
          break;
        case _doubleQuote:
          replaceWith = '\\"';
          break;
      }
      if (replaceWith !== null) {
        resultPieces.push(text.substring(startPos, i));
        resultPieces.push(replaceWith);
        startPos = i + 1;
        replaceWith = null;
      }
    }
    resultPieces.push(text.substring(startPos, len));
    return resultPieces.join('');
  }
  
  /**
   * @param {string} str 
   */
  function stripSourceMaps(str) {
    return str.replace(/\/\/# sourceMappingURL[^\n]+/gm, '');
  }
  /// End of import
}

const services = path.join(__dirname, '../built/local/typescript.js');
fs.watchFile(services, () =>{
  console.log("Updating the monaco build")
  updateTSDist()
})

// We need to re-direct non TSC JS requests back to a real copy of
// monaco, so grab the list of official releases from the TS CDN
// and use the latest stable release, as that is most likely the 
// closest version to your dev build
let latestStable = "4.3.2"
nodeFetch('https://typescript.azureedge.net/indexes/releases.json').then(req => req.json()).then(releases => {
  latestStable = /** @type {any} */ (releases).versions.pop()
});

http.createServer(function (req, res) {
  res.setHeader("Access-Control-Allow-Origin",  "*")
  
  assert(req.url);
  const incoming = url.parse(req.url)
  if (incoming.path && incoming.path.endsWith("typescriptServices.js")) {
    // Use the built version
    res.writeHead(200, {"Content-Type": "text/javascript"});
    const amdPath = path.join(__dirname, '../internal/lib/typescriptServices-amd.js');
    res.write(fs.readFileSync(amdPath))
  } else {
    // Redirect to the TS CDN
    res.writeHead(302, {
      'Location': `https://typescript.azureedge.net/cdn/${latestStable}/monaco${incoming.path}`
    }); 
  }
  
  res.end();
}).listen(5615);

console.log("Starting servers\n")
console.log(" - [✓] file watcher: " + services)
updateTSDist()
console.log(" - [✓] http server: http://localhost:5615")

console.log("\n\nGet started: http://www.staging-typescript.org/play?ts=dev")
