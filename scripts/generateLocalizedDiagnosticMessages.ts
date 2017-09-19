import * as fs from "fs";
import * as path from "path";
import * as xml2js from "xml2js";

function main(): void {
    const args = process.argv.slice(2);
    if (args.length != 2) {
        console.log("Usage:")
        console.log("\tnode generateLocalizedDiagnosticMessages.js <lcl source directory> <output directory>");
        return;
    }

    const inputPath = args[0];
    const outputPath = args[1];

    fs.readdir(inputPath, (err, files) => {
        handelError(err);
        files.forEach(visitDirectory);
    });

    return;

    function visitDirectory(name: string) {
        const inputFilePath = path.join(inputPath, name, "diagnosticMessages", "diagnosticMessages.generated.json.lcl");
        const outputFilePath = path.join(outputPath, name, "diagnosticMessages.generated.json");
        fs.readFile(inputFilePath, (err, data) => {
            handelError(err);
            xml2js.parseString(data.toString(), (err, result) => {
                handelError(err);
                ensureDirectoryExists(path.dirname(outputFilePath));
                fs.writeFile(outputFilePath, xmlObjectToString(result), handelError);
            });
        });
    }

    function handelError(err: null | object) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
    }

    function xmlObjectToString(o: any) {
        const out: any = {};
        for (const item of o["LCX"]["Item"][0]["Item"][0]["Item"]) {
            let ItemId = item["$"]["ItemId"];
            let Val = item["Str"][0]["Tgt"] ? item["Str"][0]["Tgt"][0]["Val"][0] : item["Str"][0]["Val"][0];

            if (ItemId.charAt(0) === ";") {
                ItemId = ItemId.slice(1); // remove leading semicolon
            }

            Val = Val.replace(/]5D;/, "]"); // unescape `]`
            out[ItemId] = Val;
        }
        return JSON.stringify(out, undefined, 2);
    }


    function ensureDirectoryExists(directoryPath: string) {
        const basePath = path.dirname(directoryPath);
        const shouldCreateParent = directoryPath !== basePath && !fs.existsSync(basePath);
        if (shouldCreateParent) {
            ensureDirectoryExists(basePath);
        }
        if (shouldCreateParent || !fs.existsSync(directoryPath)) {
            fs.mkdirSync(directoryPath);
        }
    }
}

main();



