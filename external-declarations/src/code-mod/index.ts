// Import TypeScript module
import * as ts from "typescript";
import { isDeclarationFileName } from "../compiler/utils";
import { addTypeAnnotationTransformer } from "./code-transform";

(ts as any).Debug .enableDebugInfo();

// Read tsconfig.json file from disk
const tsconfig = ts.readConfigFile("tsconfig.json", ts.sys.readFile);

// Parse JSON content to get compiler options and file names
const parsed = ts.parseJsonConfigFileContent(tsconfig.config, ts.sys, "./");
const options = parsed.options;
// Pass compiler options and file names to createProgram
const program = ts.createProgram(parsed.fileNames, options);

program.getSemanticDiagnostics();
const files = program.getSourceFiles();
for (const file of files) {
    if (isDeclarationFileName(file.fileName)) continue;

    const transformedFile = ts.transform(file, [
        addTypeAnnotationTransformer(program),
    ]);

    const printer = ts.createPrinter({
        onlyPrintJsDocStyle: true,
        newLine: options.newLine,
        target: options.target,
    } as ts.PrinterOptions);
    const resultStr = printer.printFile(
        transformedFile.transformed[0] as ts.SourceFile
    );
    console.log(resultStr);
}
