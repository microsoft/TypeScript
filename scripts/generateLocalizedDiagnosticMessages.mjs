import fs from "fs";
import path from "path";
import xml2js from "xml2js";

function main() {
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
    generateLCGFile();

    // generate other langs
    fs.readdir(inputPath, (err, files) => {
        handleError(err);
        files.forEach(visitDirectory);
    });

    return;

    /**
     * @param {string} name
     */
    function visitDirectory(name) {
        const inputFilePath = path.join(inputPath, name, "diagnosticMessages", "diagnosticMessages.generated.json.lcl");

        fs.readFile(inputFilePath, (err, data) => {
            handleError(err);
            xml2js.parseString(data.toString(), (err, result) => {
                handleError(err);
                if (!result || !result.LCX || !result.LCX.$ || !result.LCX.$.TgtCul) {
                    console.error("Unexpected XML file structure. Expected to find result.LCX.$.TgtCul.");
                    process.exit(1);
                }
                const outputDirectoryName = getPreferredLocaleName(result.LCX.$.TgtCul).toLowerCase();
                if (!outputDirectoryName) {
                    console.error(`Invalid output locale name for '${result.LCX.$.TgtCul}'.`);
                    process.exit(1);
                }
                writeFile(path.join(outputPath, outputDirectoryName, "diagnosticMessages.generated.json"), xmlObjectToString(result));
            });
        });
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
     * @param {null | object} err
     */
    function handleError(err) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
    }

    /**
     * @param {any} o
     */
    function xmlObjectToString(o) {
        /** @type {any} */
        const out = {};
        for (const item of o.LCX.Item[0].Item[0].Item) {
            let ItemId = item.$.ItemId;
            let val = item.Str[0].Tgt ? item.Str[0].Tgt[0].Val[0] : item.Str[0].Val[0];

            if (typeof ItemId !== "string" || typeof val !== "string") {
                console.error("Unexpected XML file structure");
                process.exit(1);
            }

            if (ItemId.charAt(0) === ";") {
                ItemId = ItemId.slice(1); // remove leading semicolon
            }

            val = val.replace(/]5D;/, "]"); // unescape `]`
            out[ItemId] = val;
        }
        return JSON.stringify(out, undefined, 2);
    }


    /**
     * @param {string} directoryPath
     * @param {() => void} action
     */
    function ensureDirectoryExists(directoryPath, action) {
        fs.exists(directoryPath, exists => {
            if (!exists) {
                const basePath = path.dirname(directoryPath);
                if (basePath !== directoryPath) {
                    return ensureDirectoryExists(basePath, () => fs.mkdir(directoryPath, action));
                }
            }
            action();
        });
    }

    /**
     * @param {string} fileName
     * @param {string} contents
     */
    function writeFile(fileName, contents) {
        ensureDirectoryExists(path.dirname(fileName), () => {
            fs.writeFile(fileName, contents, handleError);
        });
    }

    /**
     * @param {Record<string, string>} o
     */
    function objectToList(o) {
        const list = [];
        for (const key in o) {
            list.push({ key, value: o[key] });
        }
        return list;
    }

    function generateLCGFile() {
        return fs.readFile(diagnosticsMapFilePath, (err, data) => {
            handleError(err);
            writeFile(
                path.join(outputPath, "enu", "diagnosticMessages.generated.json.lcg"),
                getLCGFileXML(
                    objectToList(JSON.parse(data.toString()))
                        .sort((a, b) => a.key > b.key ? 1 : -1)  // lcg sorted by property keys
                        .reduce((s, { key, value }) => s + getItemXML(key, value), "")
                ));
        });

        /**
         * @param {string} key
         * @param {string} value
         */
        function getItemXML(key, value) {
            // escape entrt value
            value = value.replace(/]/, "]5D;");

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

main();
