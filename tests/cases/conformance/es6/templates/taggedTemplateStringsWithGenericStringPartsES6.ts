// @target: ES6

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
