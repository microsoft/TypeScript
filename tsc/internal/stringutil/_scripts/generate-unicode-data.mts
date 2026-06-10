#!/usr/bin/env -S node --experimental-strip-types --no-warnings

import * as fs from "fs";
import * as path from "path";

// All Unicode data is sourced from a single version-pinned @unicode/unicode-*
// package so the generated tables are reproducible regardless of the Node.js
// runtime used to run `go generate`. Bumping this constant (and the matching
// devDependency in package.json) is the only step needed to move to a newer
// Unicode version.
const UNICODE_VERSION = "15.1.0";
const PACKAGE = `@unicode/unicode-${UNICODE_VERSION}`;

const scriptDir = import.meta.dirname;
const CASE_OUTPUT_PATH = path.join(scriptDir, "..", "js_case_generated.go");
const IDENTIFIER_OUTPUT_PATH = path.join(scriptDir, "..", "identifier_parts_generated.go");

// A *unicode.RangeTable is split into 16-bit (BMP) and 32-bit (astral) ranges,
// each carrying a stride so arithmetic sequences (e.g. the alternating
// upper/lower letters that fill the casing tables) collapse to a single entry.
type RangeTable = {
    r16: Range[];
    r32: Range[];
    latinOffset: number;
};

type Range = {
    lo: number;
    hi: number;
    stride: number;
};

type SpecialCasingEntry = {
    codePoint: number;
    lower: number[];
    upper: number[];
    condition: string;
};

async function loadCodePoints(property: string): Promise<number[]> {
    const module = await import(`${PACKAGE}/${property}/code-points.js`);
    return module.default as number[];
}

async function loadMapping(property: string): Promise<Map<number, number[]>> {
    const module = await import(`${PACKAGE}/${property}/code-points.js`);
    return module.default as Map<number, number[]>;
}

// Group a sorted, de-duplicated run of code points into ranges sharing a
// constant stride. The stride of each range is taken from the gap to the next
// code point, so it never includes a code point that is not in the set; this
// matches the invariants unicode.Is relies on.
function toStrideRanges(sorted: number[]): Range[] {
    const ranges: Range[] = [];
    let i = 0;
    while (i < sorted.length) {
        const lo = sorted[i];
        const stride = i + 1 < sorted.length ? sorted[i + 1] - sorted[i] : 1;
        let hi = lo;
        let j = i + 1;
        while (j < sorted.length && sorted[j] === hi + stride) {
            hi = sorted[j];
            j++;
        }
        ranges.push({ lo, hi, stride });
        i = j;
    }
    return ranges;
}

// Compress a set of code points into a *unicode.RangeTable. BMP and astral code
// points are separated first so no range straddles the U+FFFF boundary between
// the R16 and R32 slices.
function toRangeTable(codePoints: Iterable<number>): RangeTable {
    const sorted = [...new Set(codePoints)].sort((a, b) => a - b);
    const bmp = sorted.filter(cp => cp <= 0xFFFF);
    const astral = sorted.filter(cp => cp > 0xFFFF);
    const r16 = toStrideRanges(bmp);
    const r32 = toStrideRanges(astral);
    // unicode.Is fast-paths Latin-1 by linearly scanning the leading R16 entries
    // whose Hi is within Latin-1 (U+00FF); LatinOffset records how many those are.
    let latinOffset = 0;
    while (latinOffset < r16.length && r16[latinOffset].hi <= 0xFF) {
        latinOffset++;
    }
    return { r16, r32, latinOffset };
}

function goRuneLiteral(codePoint: number): string {
    return `0x${codePoint.toString(16).toUpperCase()}`;
}

function goStringLiteral(codePoints: number[]): string {
    let text = '"';
    for (const codePoint of codePoints) {
        if (codePoint <= 0xFFFF) {
            text += `\\u${codePoint.toString(16).toUpperCase().padStart(4, "0")}`;
        }
        else {
            text += `\\U${codePoint.toString(16).toUpperCase().padStart(8, "0")}`;
        }
    }
    text += '"';
    return text;
}

function renderRangeTable(name: string, table: RangeTable): string {
    const r16 = table.r16.map(r => `\t\t{${goRuneLiteral(r.lo)}, ${goRuneLiteral(r.hi)}, ${r.stride}},`).join("\n");
    const r32 = table.r32.map(r => `\t\t{${goRuneLiteral(r.lo)}, ${goRuneLiteral(r.hi)}, ${r.stride}},`).join("\n");
    return `var ${name} = &unicode.RangeTable{
\tR16: []unicode.Range16{
${r16}
\t},
\tR32: []unicode.Range32{
${r32}
\t},
\tLatinOffset: ${table.latinOffset},
}
`;
}

async function buildSpecialCasing(): Promise<SpecialCasingEntry[]> {
    // The unconditional, locale-insensitive multi-rune mappings. Each map keys a
    // code point to its full lower/upper expansion (identity when unchanged).
    const lowerMappings = await loadMapping("Special_Casing/Lowercase");
    const upperMappings = await loadMapping("Special_Casing/Uppercase");
    // toLowerCase emits the word-final sigma only in Final_Sigma context, so this
    // mapping is tracked separately and applied by the Go caser when in context.
    const finalSigmaMappings = await loadMapping("Special_Casing/Lowercase--Final_Sigma");

    const entries: SpecialCasingEntry[] = [];

    const codePoints = new Set([...lowerMappings.keys(), ...upperMappings.keys()]);
    for (const codePoint of codePoints) {
        entries.push({
            codePoint,
            lower: lowerMappings.get(codePoint) ?? [codePoint],
            upper: upperMappings.get(codePoint) ?? [codePoint],
            condition: "specialCasingConditionNone",
        });
    }

    for (const [codePoint, lower] of finalSigmaMappings) {
        entries.push({
            codePoint,
            lower,
            upper: upperMappings.get(codePoint) ?? [codePoint],
            condition: "specialCasingConditionFinalSigma",
        });
    }

    entries.sort((a, b) => a.codePoint - b.codePoint);
    return entries;
}

function renderCaseFile(entries: SpecialCasingEntry[], casedTable: RangeTable, caseIgnorableTable: RangeTable): string {
    const mappings = entries.map(entry => `\t${goRuneLiteral(entry.codePoint)}: {lower: ${goStringLiteral(entry.lower)}, upper: ${goStringLiteral(entry.upper)}, condition: ${entry.condition}},`).join("\n");

    return `// Code generated by generate-unicode-data.mts. DO NOT EDIT.
// Derived from the ${PACKAGE} package (Unicode ${UNICODE_VERSION}).
// Includes only the locale-insensitive multi-rune mappings needed for ECMAScript
// default casing, plus the Final_Sigma context mapping. String.prototype.toLowerCase
// applies Final_Sigma, but Go's unicode package does not, so the caser applies it
// from this data when in context. Go's unicode package handles the simple one-rune
// mappings, so those are omitted here.

package stringutil

import "unicode"

type specialCasingCondition uint8

const (
\tspecialCasingConditionNone specialCasingCondition = iota
\tspecialCasingConditionFinalSigma
)

type specialCasingMapping struct {
\tlower     string
\tupper     string
\tcondition specialCasingCondition
}

var specialCasingMappings = map[rune]specialCasingMapping{
${mappings}
}

${renderRangeTable("unicodeCasedRanges", casedTable)}
${renderRangeTable("unicodeCaseIgnorableRanges", caseIgnorableTable)}
`;
}

function renderIdentifierFile(startTable: RangeTable, partTable: RangeTable): string {
    return `// Code generated by generate-unicode-data.mts. DO NOT EDIT.
// Derived from the ${PACKAGE} package (Unicode ${UNICODE_VERSION}).
// Based on http://www.unicode.org/reports/tr31/ and
// https://www.ecma-international.org/ecma-262/6.0/#sec-names-and-keywords:
// unicodeESNextIdentifierStart corresponds to the ID_Start and Other_ID_Start property, and
// unicodeESNextIdentifierPart corresponds to ID_Continue, Other_ID_Continue, plus ID_Start and Other_ID_Start.

package stringutil

import "unicode"

${renderRangeTable("unicodeESNextIdentifierStart", startTable)}
${renderRangeTable("unicodeESNextIdentifierPart", partTable)}
`;
}

async function main() {
    const entries = await buildSpecialCasing();
    const casedTable = toRangeTable(await loadCodePoints("Binary_Property/Cased"));
    const caseIgnorableTable = toRangeTable(await loadCodePoints("Binary_Property/Case_Ignorable"));
    fs.writeFileSync(CASE_OUTPUT_PATH, renderCaseFile(entries, casedTable, caseIgnorableTable));

    const idStart = await loadCodePoints("Binary_Property/ID_Start");
    const idContinue = await loadCodePoints("Binary_Property/ID_Continue");
    // Other_ID_Start/Other_ID_Continue are already folded into ID_Start/ID_Continue.
    const startTable = toRangeTable(idStart);
    const partTable = toRangeTable([...idContinue, ...idStart]);
    fs.writeFileSync(IDENTIFIER_OUTPUT_PATH, renderIdentifierFile(startTable, partTable));
}

await main();
