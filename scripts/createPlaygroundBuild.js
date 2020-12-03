// @ts-check

// This script does two things: 
//  
//  - Listens to changes to the built version of TypeScript (via a filewatcher on `built/local/typescriptServices.js`)
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

const path = require('path');
const fs = require('fs');
const child_process = require('child_process');
const http = require('http');
const url = require('url');

function updateTSDist() {
  // This code is a direct port of a script from monaco-typescript
  // https://github.com/microsoft/monaco-typescript/blob/master/scripts/importTypescript.js
  // Currently based on 778ace1 on Apr 25 2020 

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
  
    const npmLsOutput = JSON.parse(child_process.execSync("npm ls typescript --depth=0 --json=true").toString());
    const typeScriptDependencyVersion = npmLsOutput.dependencies.typescript.version;
  
    fs.writeFileSync(
      path.join(TYPESCRIPT_LIB_DESTINATION, 'typescriptServicesMetadata.ts'),
      `${generatedNote}
  export const typescriptVersion = "${typeScriptDependencyVersion}";\n`
    );
  
    var tsServices = fs.readFileSync(path.join(TYPESCRIPT_LIB_SOURCE, 'typescriptServices.js')).toString();
  
    // Ensure we never run into the node system...
    // (this also removes require calls that trick webpack into shimming those modules...)
    tsServices = (
      tsServices.replace(/\n    ts\.sys =([^]*)\n    \}\)\(\);/m, `\n    // MONACOCHANGE\n    ts.sys = undefined;\n    // END MONACOCHANGE`)
    );
  
    // Eliminate more require() calls...
    tsServices = tsServices.replace(/^( +)etwModule = require\(.*$/m, '$1// MONACOCHANGE\n$1etwModule = undefined;\n$1// END MONACOCHANGE');
    tsServices = tsServices.replace(/^( +)var result = ts\.sys\.require\(.*$/m, '$1// MONACOCHANGE\n$1var result = undefined;\n$1// END MONACOCHANGE');
  
    // Flag any new require calls (outside comments) so they can be corrected preemptively.
    // To avoid missing cases (or using an even more complex regex), temporarily remove comments
    // about require() and then check for lines actually calling require().
    // \/[*/] matches the start of a comment (single or multi-line).
    // ^\s+\*[^/] matches (presumably) a later line of a multi-line comment.
    const tsServicesNoCommentedRequire = tsServices.replace(/(\/[*/]|^\s+\*[^/]).*\brequire\(.*/gm, '');
    const linesWithRequire = tsServicesNoCommentedRequire.match(/^.*?\brequire\(.*$/gm)
  
    // Allow error messages to include references to require() in their strings
    const runtimeRequires = linesWithRequire && linesWithRequire.filter(l => !l.includes(": diag("))
  
    if (runtimeRequires && runtimeRequires.length) {
      console.error('Found new require() calls on the following lines. These should be removed to avoid breaking webpack builds.\n');
      console.error(linesWithRequire.join('\n'));
      process.exit(1);
    }
  
    // Make sure process.args don't get called in the browser, this
    // should only happen in TS 2.6.2
    const beforeProcess = `ts.perfLogger.logInfoEvent("Starting TypeScript v" + ts.versionMajorMinor + " with command line: " + JSON.stringify(process.argv));`
    const afterProcess = `// MONACOCHANGE\n    ts.perfLogger.logInfoEvent("Starting TypeScript v" + ts.versionMajorMinor + " with command line: " + JSON.stringify([]));\n// END MONACOCHANGE`
    tsServices = tsServices.replace(beforeProcess, afterProcess);
  
    var tsServices_amd = generatedNote + tsServices +
      `
  // MONACOCHANGE
  // Defining the entire module name because r.js has an issue and cannot bundle this file
  // correctly with an anonymous define call
  define("vs/language/typescript/lib/typescriptServices", [], function() { return ts; });
  // END MONACOCHANGE
  `;
    fs.writeFileSync(path.join(TYPESCRIPT_LIB_DESTINATION, 'typescriptServices-amd.js'), tsServices_amd);
  
    var tsServices_esm = generatedNote + tsServices +
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
  // END MONACOCHANGE
  `;
    fs.writeFileSync(path.join(TYPESCRIPT_LIB_DESTINATION, 'typescriptServices.js'), tsServices_esm);
  
    var dtsServices = fs.readFileSync(path.join(TYPESCRIPT_LIB_SOURCE, 'typescriptServices.d.ts')).toString();
    dtsServices +=
      `
  // MONACOCHANGE
  export = ts;
  // END MONACOCHANGE
  `;
    fs.writeFileSync(path.join(TYPESCRIPT_LIB_DESTINATION, 'typescriptServices.d.ts'), generatedNote + dtsServices);
  
  })();
  
  function importLibs() {
    function getFileName(name) {
      return (name === '' ? 'lib.d.ts' : `lib.${name}.d.ts`);
    }
    function getVariableName(name) {
      return (name === '' ? 'lib_dts' : `lib_${name.replace(/\./g, '_')}_dts`);
    }
    function readLibFile(name) {
      var srcPath = path.join(TYPESCRIPT_LIB_SOURCE, getFileName(name));
      return fs.readFileSync(srcPath).toString();
    }
  
    var queue = [];
    var in_queue = {};
  
    var enqueue = function (name) {
      if (in_queue[name]) {
        return;
      }
      in_queue[name] = true;
      queue.push(name);
    };
  
    enqueue('');
    enqueue('es2015');
  
    var result = [];
    while (queue.length > 0) {
      var name = queue.shift();
      var contents = readLibFile(name);
      var lines = contents.split(/\r\n|\r|\n/);
  
      var output = '';
      var writeOutput = function (text) {
        if (output.length === 0) {
          output = text;
        } else {
          output += ` + ${text}`;
        }
      };
      var outputLines = [];
      var flushOutputLines = function () {
        writeOutput(`"${escapeText(outputLines.join('\n'))}"`);
        outputLines = [];
      };
      var deps = [];
      for (let i = 0; i < lines.length; i++) {
        let m = lines[i].match(/\/\/\/\s*<reference\s*lib="([^"]+)"/);
        if (m) {
          flushOutputLines();
          writeOutput(getVariableName(m[1]));
          deps.push(getVariableName(m[1]));
          enqueue(m[1]);
          continue;
        }
        outputLines.push(lines[i]);
      }
      flushOutputLines();
  
      result.push({
        name: getVariableName(name),
        deps: deps,
        output: output
      });
    }
  
    var strResult = `/*---------------------------------------------------------------------------------------------
   *  Copyright (c) Microsoft Corporation. All rights reserved.
   *  Licensed under the MIT License. See License.txt in the project root for license information.
   *--------------------------------------------------------------------------------------------*/
  ${generatedNote}`;
    // Do a topological sort
    while (result.length > 0) {
      for (let i = result.length - 1; i >= 0; i--) {
        if (result[i].deps.length === 0) {
          // emit this node
          strResult += `\nexport const ${result[i].name}: string = ${result[i].output};\n`;
  
          // mark dep as resolved
          for (let j = 0; j < result.length; j++) {
            for (let k = 0; k < result[j].deps.length; k++) {
              if (result[j].deps[k] === result[i].name) {
                result[j].deps.splice(k, 1);
                break;
              }
            }
          }
  
          // remove from result
          result.splice(i, 1);
          break;
        }
      }
    }
  
    strResult += `
  /** This is the DTS which is used when the target is ES6 or below */
  export const lib_es5_bundled_dts = lib_dts;
  
  /** This is the DTS which is used by default in monaco-typescript, and when the target is 2015 or above */
  export const lib_es2015_bundled_dts = lib_es2015_dts + "" + lib_dom_dts + "" + lib_webworker_importscripts_dts + "" + lib_scripthost_dts + "";
  `
  
    var dstPath = path.join(TYPESCRIPT_LIB_DESTINATION, 'lib.ts');
    fs.writeFileSync(dstPath, strResult);
  }
  
  /**
   * Escape text such that it can be used in a javascript string enclosed by double quotes (")
   */
  function escapeText(text) {
    // See http://www.javascriptkit.com/jsref/escapesequence.shtml
    var _backspace = '\b'.charCodeAt(0);
    var _formFeed = '\f'.charCodeAt(0);
    var _newLine = '\n'.charCodeAt(0);
    var _nullChar = 0;
    var _carriageReturn = '\r'.charCodeAt(0);
    var _tab = '\t'.charCodeAt(0);
    var _verticalTab = '\v'.charCodeAt(0);
    var _backslash = '\\'.charCodeAt(0);
    var _doubleQuote = '"'.charCodeAt(0);
  
    var startPos = 0, chrCode, replaceWith = null, resultPieces = [];
  
    for (var i = 0, len = text.length; i < len; i++) {
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

  /// End of import
}

const services = path.join(__dirname, '../built/local/typescriptServices.js');
fs.watchFile(services, () =>{
  console.log("Updating the monaco build")
  updateTSDist()
})

http.createServer(function (req, res) {
  const incoming = url.parse(req.url)
  if (incoming.path.endsWith("typescriptServices.js")) {
    // Use the built version
    res.writeHead(200, {"Content-Type": "text/javascript"});
    const amdPath = path.join(__dirname, '../internal/lib/typescriptServices-amd.js');
    res.write(fs.readFileSync(amdPath))
  } else {
    // Redirect to the TS CDN
    res.writeHead(302, {
      'Location': `https://typescript.azureedge.net/cdn/3.9.2/monaco/${incoming.path}`
    }); 
  }
  
  res.end();
}).listen(5615);

console.log("Starting servers\n")
console.log(" - [✓] file watcher: " + services)
console.log(" - [✓] http server: http://localhost:5615")

console.log("\n\nGet started: http://www.staging-typescript.org/play?ts=dev")
