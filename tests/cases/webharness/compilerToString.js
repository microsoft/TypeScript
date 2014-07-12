var _fs = require('fs');

var wholeCompilerString = _fs.readFileSync("wholecompiler.ts");
var wholeLibString = _fs.readFileSync("../../../typings/lib.d.ts");

function quoteString(str, name) {
    str = String(str);
    var outputText = "var " + name + " = " + "\"";
    var last = "";

    for (var i = 0; i < str.length; i++) {
        var char = str.charAt(i);

        // if (last == "\\" && (char == "\"" || char == "'")) {
        // 	last = char;
        // 	continue;
        // }
        // Prefix quotation mark with a backslash,
        if (char == "\"") {
            outputText += "\\\"";
        }
            // Prefix apostrophe with a backslash,
        else if (char == "'") {
            outputText += "\\'";
        }
            // right quote
        else if (char == "'") {
            outputText += "\\'";
        }
            // rigth quote
        else if (char == "\"") {
            outputText += "\\\"";
        }
            // convert newline to a literal.
        else if (char == "\n") {
            outputText += "\\n";
        }
        else if (char == "\r") {
            continue;
        }
        else if (char == "\\") {
            outputText += "\\\\";
        }
        else {
            outputText += char;
        }

        last = char;
    }

    return outputText + "\";";
}

var quotedCompilerString = quoteString(wholeCompilerString, "compilerString");
var quotedLibString = quoteString(wholeLibString, "libString");

_fs.writeFileSync("quotedCompiler.ts", quotedCompilerString);
_fs.writeFileSync("quotedLib.ts", quotedLibString);