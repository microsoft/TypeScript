// word2md - Word to Markdown conversion tool
//
// word2md converts a Microsoft Word document to Markdown formatted text. The tool uses the
// Word Automation APIs to start an instance of Word and access the contents of the document
// being converted. The tool must be run using the cscript.exe script host and requires Word
// to be installed on the target machine. The name of the document to convert must be specified
// as a command line argument and the resulting Markdown is written to standard output. The
// tool recognizes the specific Word styles used in the TypeScript Language Specification.

module Word {

    export interface Collection<T> {
        count: number;
        item(index: number): T;
    }

    export interface Font {
        bold: boolean;
        italic: boolean;
        subscript: boolean;
        superscript: boolean;
    }

    export interface Find {
        font: Font;
        format: boolean;
        replacement: Replacement;
        style: any;
        text: string;
        clearFormatting(): void;
        execute(
            findText: string,
            matchCase: boolean,
            matchWholeWord: boolean,
            matchWildcards: boolean,
            matchSoundsLike: boolean,
            matchAllWordForms: boolean,
            forward: boolean,
            wrap: number,
            format: boolean,
            replaceWith: string,
            replace: number): boolean;
    }

    export interface Replacement {
        font: Font;
        style: any;
        text: string;
        clearFormatting(): void;
    }

    export interface ListFormat {
        listLevelNumber: number;
        listString: string;
    }

    export interface Column {
    }

    export interface Columns extends Collection<Column> {
    }

    export interface Table {
        columns: Columns;
    }

    export interface Tables extends Collection<Table> {
    }

    export interface Range {
        find: Find;
        listFormat: ListFormat;
        tables: Tables;
        text: string;
        words: Ranges;
    }

    export interface Ranges extends Collection<Range> {
    }

    export interface Style {
        nameLocal: string;
    }

    export interface Paragraph {
        alignment: number;
        range: Range;
        style: Style;
        next(): Paragraph;
    }

    export interface Paragraphs extends Collection<Paragraph> {
        first: Paragraph;
    }

    export interface Field {
    }

    export interface Fields extends Collection<Field> {
        toggleShowCodes(): void;
    }

    export interface Document {
        fields: Fields;
        paragraphs: Paragraphs;
        close(saveChanges: boolean): void;
        range(): Range;
    }

    export interface Documents extends Collection<Document> {
        open(filename: string): Document;
    }

    export interface Application {
        documents: Documents;
        quit(): void;
    }
}

var sys = (function () {
    var args: string[] = [];
    for (var i = 0; i < WScript.Arguments.length; i++) {
        args[i] = WScript.Arguments.Item(i);
    }
    return {
        args: args,
        createObject: (typeName: string) => new ActiveXObject(typeName),
        write: (s: string) => WScript.StdOut.Write(s)
    };
})();

function convertDocumentToMarkdown(doc: Word.Document): string {

    var result: string = "";
    var lastStyle: string;
    var lastInTable: boolean;
    var tableColumnCount: number;
    var tableCellIndex: number;
    var columnAlignment: number[] = [];

    function setProperties(target: any, properties: any) {
        for (var name in properties) {
            if (properties.hasOwnProperty(name)) {
                var value = properties[name];
                if (typeof value === "object") {
                    setProperties(target[name], value);
                }
                else {
                    target[name] = value;
                }
            }
        }
    }

    function findReplace(findText: string, findProps: {}, replaceText: string, replaceProps: {}) {
        var find = doc.range().find;
        find.clearFormatting();
        setProperties(find, findProps);
        var replace = find.replacement;
        replace.clearFormatting();
        setProperties(replace, replaceProps);
        find.execute(findText, false, false, false, false, false, true, 0, true, replaceText, 2);
    }

    function write(s: string) {
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

    function trimEndFormattingMarks(text: string) {
        var i = text.length;
        while (i > 0 && text.charCodeAt(i - 1) < 0x20) i--;
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

    function writeParagraph(p: Word.Paragraph) {

        var text = p.range.text;
        var style = p.style.nameLocal;
        var inTable = p.range.tables.count > 0;
        var level = 1;
        var sectionBreak = text.indexOf("\x0C") >= 0;

        text = trimEndFormattingMarks(text);
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
                write("####".substr(0, level) + ' <a name="' + section + '"/>' + section + " " + text + "\n\n");
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
        for (var p = doc.paragraphs.first; p; p = p.next()) {
            writeParagraph(p);
        }
        writeBlockEnd();
    }

    findReplace("", { font: { subscript: true } }, "<sub>^&</sub>", { font: { subscript: false } });
    findReplace("", { style: "Code Fragment" }, "`^&`", { style: -66 /* default font */ });
    findReplace("", { style: "Production" }, "*^&*", { style: -66 /* default font */});
    findReplace("", { style: "Terminal" }, "`^&`", { style: -66 /* default font */});
    findReplace("", { font: { bold: true, italic: true } }, "***^&***", { font: { bold: false, italic: false } });
    findReplace("", { font: { italic: true } }, "*^&*", { font: { italic: false } });

    doc.fields.toggleShowCodes();
    findReplace("^19 REF", {}, "[^&](#^&)", {});
    doc.fields.toggleShowCodes();

    writeDocument();

    return result;
}

function main(args: string[]) {
    if (args.length !== 1) {
        sys.write("Syntax: word2md <filename>\n");
        return;
    }
    var app: Word.Application = sys.createObject("Word.Application");
    var doc = app.documents.open(args[0]);
    sys.write(convertDocumentToMarkdown(doc));
    doc.close(false);
    app.quit();
}

main(sys.args);
