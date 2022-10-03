// basic valid forms of union literals

var simpleUnion: string | number;
var unionOfUnion: string | number | boolean;

var arrayOfUnions: (string | number)[];
var arrayOfUnions: Array<string | number>;

var unionOfFunctionType: (() => string) | (() => number);
var unionOfFunctionType: { (): string } | { (): number };
var unionOfFunctionType: () => string | number;

var unionOfConstructorType: (new () => string) | (new () => number);
var unionOfConstructorType: { new (): string } | { new (): number };
var unionOfConstructorType: new () => string | number;