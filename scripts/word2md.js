// word2md - Word to Markdown conversion tool
//
// word2md converts a Microsoft Word document to Markdown formatted text. The tool uses the
// Word Automation APIs to start an instance of Word and access the contents of the document
// being converted. The tool must be run using the cscript.exe script host and requires Word
// to be installed on the target machine. The name of the document to convert must be specified
// as a command line argument and the resulting Markdown is written to standard output. The
// tool recognizes the specific Word styles used in the TypeScript Language Specification.
var sys = (function () {
    var args = [];
    for (var i = 0; i < WScript.Arguments.length; i++) {
        args[i] = WScript.Arguments.Item(i);
    }
    return {
        args: args,
        createObject: function (typeName) { return new ActiveXObject(typeName); },
        write: function (s) { return WScript.StdOut.Write(s); }
    };
})();
function convertDocumentToMarkdown(doc) {
    var result = "";
    var lastStyle;
    var lastInTable;
    var tableColumnCount;
    var tableCellIndex;
    var columnAlignment = [];
    function reformatSubscripts() {
        var find = doc.range().find;
        find.clearFormatting();
        find.font.subscript = true;
        var replace = find.replacement;
        replace.clearFormatting();
        replace.font.subscript = false;
        find.execute("", false, false, false, false, false, true, 0, true, "<sub>^&</sub>", 2);
    }
    function reformatCodeFragments() {
        var find = doc.range().find;
        find.clearFormatting();
        find.style = "Code Fragment";
        var replace = find.replacement;
        replace.clearFormatting();
        replace.style = -66; // Default Paragraph Font
        find.execute("", false, false, false, false, false, true, 0, true, "`^&`", 2);
    }
    function reformatProductions() {
        var find = doc.range().find;
        find.clearFormatting();
        find.style = "Production";
        var replace = find.replacement;
        replace.clearFormatting();
        replace.style = -66; // Default Paragraph Font
        find.execute("", false, false, false, false, false, true, 0, true, "*^&*", 2);
    }
    function reformatTerminals() {
        var find = doc.range().find;
        find.clearFormatting();
        find.style = "Terminal";
        var replace = find.replacement;
        replace.clearFormatting();
        replace.style = -66; // Default Paragraph Font
        find.execute("", false, false, false, false, false, true, 0, true, "`^&`", 2);
    }
    function reformatBoldItalic() {
        var find = doc.range().find;
        find.clearFormatting();
        find.font.bold = true;
        find.font.italic = true;
        var replace = find.replacement;
        replace.clearFormatting();
        replace.font.bold = false;
        replace.font.italic = false;
        find.execute("", false, false, false, false, false, true, 0, true, "***^&***", 2);
    }
    function reformatItalic() {
        var find = doc.range().find;
        find.clearFormatting();
        find.font.italic = true;
        var replace = find.replacement;
        replace.clearFormatting();
        replace.font.italic = false;
        find.execute("", false, false, false, false, false, true, 0, true, "*^&*", 2);
    }
    function reformatReferences() {
        doc.fields.toggleShowCodes();
        var find = doc.range().find;
        find.clearFormatting();
        var replace = find.replacement;
        replace.clearFormatting();
        find.execute("^19 REF", false, false, false, false, false, true, 0, true, "[^&](#^&)", 2);
        doc.fields.toggleShowCodes();
    }
    function write(s) {
        result += s;
    }
    function writeTableHeader() {
        for (var i = 0; i < tableColumnCount - 1; i++) {
            switch (columnAlignment[i]) {
                case 1:
                    write("|:---:");
                    break;
                case 2:
                    write("|---:");
                    break;
                default:
                    write("|---");
            }
        }
        write("|\n");
    }
    function stripFormattingMarks(text) {
        var i = text.length;
        while (i > 0 && text.charCodeAt(i - 1) < 0x20)
            i--;
        return text.substr(0, i);
    }
    function writeBlockEnd() {
        switch (lastStyle) {
            case "Code":
                write("```\n\n");
                break;
            case "List Paragraph":
            case "Table":
            case "TOC":
                write("\n");
                break;
        }
    }
    function writeParagraph(p) {
        var text = p.range.text;
        var style = p.style.nameLocal;
        var inTable = p.range.tables.count > 0;
        var level = 1;
        var sectionBreak = text.indexOf("\x0C") >= 0;
        text = stripFormattingMarks(text);
        if (inTable) {
            style = "Table";
        }
        else if (style.match(/\s\d$/)) {
            level = +style.substr(style.length - 1);
            style = style.substr(0, style.length - 2);
        }
        if (lastStyle && style !== lastStyle) {
            writeBlockEnd();
        }
        switch (style) {
            case "Heading":
            case "Appendix":
                var section = p.range.listFormat.listString;
                write("####".substr(0, level) + " <a name=\"" + section + "\"/>" + section + " " + text + "\n\n");
                break;
            case "Normal":
                if (text.length) {
                    write(text + "\n\n");
                }
                break;
            case "List Paragraph":
                write("        ".substr(0, p.range.listFormat.listLevelNumber * 2 - 2) + "* " + text + "\n");
                break;
            case "Grammar":
                write("&emsp;&emsp;" + text.replace(/\s\s\s/g, "&emsp;").replace(/\x0B/g, "  \n&emsp;&emsp;&emsp;") + "\n\n");
                break;
            case "Code":
                if (lastStyle !== "Code") {
                    write("```TypeScript\n");
                }
                else {
                    write("\n");
                }
                write(text.replace(/\x0B/g, "  \n") + "\n");
                break;
            case "Table":
                if (!lastInTable) {
                    tableColumnCount = p.range.tables.item(1).columns.count + 1;
                    tableCellIndex = 0;
                }
                if (tableCellIndex < tableColumnCount) {
                    columnAlignment[tableCellIndex] = p.alignment;
                }
                write("|" + text);
                tableCellIndex++;
                if (tableCellIndex % tableColumnCount === 0) {
                    write("\n");
                    if (tableCellIndex === tableColumnCount) {
                        writeTableHeader();
                    }
                }
                break;
            case "TOC Heading":
                write("## " + text + "\n\n");
                break;
            case "TOC":
                var strings = text.split("\t");
                write("        ".substr(0, level * 2 - 2) + "* [" + strings[0] + " " + strings[1] + "](#" + strings[0] + ")\n");
                break;
        }
        if (sectionBreak) {
            write("<br/>\n\n");
        }
        lastStyle = style;
        lastInTable = inTable;
    }
    function writeDocument() {
        var p = doc.paragraphs.first;
        while (p) {
            writeParagraph(p);
            p = p.next();
        }
        writeBlockEnd();
    }
    reformatSubscripts();
    reformatCodeFragments();
    reformatProductions();
    reformatTerminals();
    reformatBoldItalic();
    reformatItalic();
    reformatReferences();
    writeDocument();
    return result;
}
function main(args) {
    if (args.length !== 1) {
        sys.write("Syntax: word2md <filename>\n");
        return;
    }
    var app = sys.createObject("Word.Application");
    var doc = app.documents.open(args[0]);
    sys.write(convertDocumentToMarkdown(doc));
    doc.close(false);
    app.quit();
}
main(sys.args);
