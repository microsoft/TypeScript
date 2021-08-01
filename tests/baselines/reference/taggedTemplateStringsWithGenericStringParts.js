//// [taggedTemplateStringsWithGenericStringParts.ts]
type DataTypes = 'string'|'number'|'boolean';

interface DataTypesToTypeScriptType {
  string: string;
  number: number;
  boolean: boolean;
}

type ArgsFor<TParts extends readonly unknown[]> =
    TParts extends [infer THead, ...infer TTail]
        ? THead extends DataTypes
            ? [DataTypesToTypeScriptType[THead], ...ArgsFor<TTail>]
            : [never, ...ArgsFor<TTail>]
        : []

declare function dataTypes<TParts extends readonly string[], TArgs extends ArgsFor<TParts>>(
  parts: TemplateStringsArray<readonly [...TParts, '']>,
  ...args: TArgs): unknown;

dataTypes `string${'abc'}`;

dataTypes `number${5}`;

dataTypes `boolean${true}`;

dataTypes `unknown${[]}`;

dataTypes `string${3}`;

dataTypes `string${'abc'}string${'def'}number${10}boolean${false}`;


//// [taggedTemplateStringsWithGenericStringParts.js]
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
dataTypes(__makeTemplateObject(["string", ""], ["string", ""]), 'abc');
dataTypes(__makeTemplateObject(["number", ""], ["number", ""]), 5);
dataTypes(__makeTemplateObject(["boolean", ""], ["boolean", ""]), true);
dataTypes(__makeTemplateObject(["unknown", ""], ["unknown", ""]), []);
dataTypes(__makeTemplateObject(["string", ""], ["string", ""]), 3);
dataTypes(__makeTemplateObject(["string", "string", "number", "boolean", ""], ["string", "string", "number", "boolean", ""]), 'abc', 'def', 10, false);
