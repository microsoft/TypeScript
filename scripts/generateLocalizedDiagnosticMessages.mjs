import { XMLParser } from "fast-xml-parser";
import fs from "fs";
import path from "path";

/** @typedef {{
    LCX: {
        $_TgtCul: string;
        Item: {
            Item: {
                Item: {
                    $_ItemId: string;
                    Str: {
                        Val: string;
                        Tgt: {
                            Val: string;
                        };
                    };
                }[];
            };
        };
    }
}} ParsedLCL */
void 0;

async function main() {
    const args = process.argv.slice(2);
    if (args.length !== 3) {
        console.log("Usage:");
        console.log("\tnode generateLocalizedDiagnosticMessages.js <lcl source directory> <output directory> <generated diagnostics map file>");
        return;
    }

    const inputPath = args[0];
    const outputPath = args[1];
    const diagnosticsMapFilePath = args[2];

    // generate the lcg file for enu
    await generateLCGFile();

    // generate other langs
    const files = await fs.promises.readdir(inputPath);
    await Promise.all(files.map(visitDirectory));

    return;

    /**
     * @param {string} name
     */
    async function visitDirectory(name) {
        const inputFilePath = path.join(inputPath, name, "diagnosticMessages", "diagnosticMessages.generated.json.lcl");
        const contents = await fs.promises.readFile(inputFilePath);
        /** @type {ParsedLCL} */
        const result = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: "$_" }).parse(contents);
        if (!result || !result.LCX || !result.LCX.$_TgtCul) {
            console.error("Unexpected XML file structure. Expected to find result.LCX.$_TgtCul.");
            process.exit(1);
        }
        const outputDirectoryName = getPreferredLocaleName(result.LCX.$_TgtCul).toLowerCase();
        if (!outputDirectoryName) {
            console.error(`Invalid output locale name for '${result.LCX.$_TgtCul}'.`);
            process.exit(1);
        }
        await writeFile(path.join(outputPath, outputDirectoryName, "diagnosticMessages.generated.json"), xmlObjectToString(result));
    }

    /**
     * A locale name is based on the language tagging conventions of RFC 4646 (Windows Vista
     * and later), and is represented by LOCALE_SNAME.
     * Generally, the pattern <language>-<REGION> is used. Here, language is a lowercase ISO 639
     * language code. The codes from ISO 639-1 are used when available. Otherwise, codes from
     * ISO 639-2/T are used. REGION specifies an uppercase ISO 3166-1 country/region identifier.
     * For example, the locale name for English (United States) is "en-US" and the locale name
     * for Divehi (Maldives) is "dv-MV".
     *
     * If the locale is a neutral locale (no region), the LOCALE_SNAME value follows the
     * pattern <language>. If it is a neutral locale for which the script is significant, the
     * pattern is <language>-<Script>.
     *
     * More at https://msdn.microsoft.com/en-us/library/windows/desktop/dd373814(v=vs.85).aspx
     *
     * Most of the languages we support are neutral locales, so we want to use the language name.
     * There are three exceptions, zh-CN, zh-TW and pt-BR.
     *
     * @param {string} localeName
     */
    function getPreferredLocaleName(localeName) {
        switch (localeName) {
            case "zh-CN":
            case "zh-TW":
            case "pt-BR":
                return localeName;
            default:
                return localeName.split("-")[0];
        }
    }

    /**
     * @param {ParsedLCL} o
     */
    function xmlObjectToString(o) {
        /** @type {any} */
        const out = {};
        for (const item of o.LCX.Item.Item.Item) {
            let ItemId = item.$_ItemId;
            let val = item.Str.Tgt ? item.Str.Tgt.Val : item.Str.Val;

            if (typeof ItemId !== "string" || typeof val !== "string") {
                console.error("Unexpected XML file structure");
                process.exit(1);
            }

            if (ItemId.charAt(0) === ";") {
                ItemId = ItemId.slice(1); // remove leading semicolon
            }

            val = val.replace(/\]5D;/, "]"); // unescape `]`
            out[ItemId] = val;
        }
        return JSON.stringify(out, undefined, 2);
    }

    /**
     * @param {string} fileName
     * @param {string} contents
     */
    async function writeFile(fileName, contents) {
        await fs.promises.mkdir(path.dirname(fileName), { recursive: true });
        await fs.promises.writeFile(fileName, contents);
    }

    async function generateLCGFile() {
        const contents = await fs.promises.readFile(diagnosticsMapFilePath, "utf-8");
        await writeFile(
            path.join(outputPath, "enu", "diagnosticMessages.generated.json.lcg"),
            getLCGFileXML(
                Object.entries(JSON.parse(contents))
                    .sort((a, b) => a[0] > b[0] ? 1 : -1) // lcg sorted by property keys
                    .reduce((s, [key, value]) => s + getItemXML(key, value), ""),
            ),
        );
        return;

        /**
         * @param {string} key
         * @param {string} value
         */
        function getItemXML(key, value) {
            // escape entrt value
            value = value.replace(/\]/g, "]5D;");

            return `
            <Item ItemId=";${key}" ItemType="0" PsrId="306" Leaf="true">
              <Str Cat="Text">
                <Val><![CDATA[${value}]]></Val>
              </Str>
              <Disp Icon="Str" />
            </Item>`;
        }

        /**
         * @param {string} items
         */
        function getLCGFileXML(items) {
            return `<?xml version="1.0" encoding="utf-8"?>
<LCX SchemaVersion="6.0" Name="diagnosticMessages.generated.json" PsrId="306" FileType="1" SrcCul="en-US" xmlns="http://schemas.microsoft.com/locstudio/2006/6/lcx">
  <OwnedComments>
    <Cmt Name="Dev" />
    <Cmt Name="LcxAdmin" />
    <Cmt Name="Rccx" />
  </OwnedComments>
  <Item ItemId=";String Table" ItemType="0" PsrId="306" Leaf="false">
    <Disp Icon="Expand" Expand="true" Disp="true" LocTbl="false" />
    <Item ItemId=";Strings" ItemType="0" PsrId="306" Leaf="false">
      <Disp Icon="Str" Disp="true" LocTbl="false" />${items}
    </Item>
  </Item>
</LCX>`;
        }
    }
}

await main();
