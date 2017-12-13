export type BaseAttribute<T> = {
    type?: string;
}
export type StringAttribute = BaseAttribute<string> & {
    type: "string";
}
export type NumberAttribute = BaseAttribute<string> & {
    type: "number";
}
export type Attribute = StringAttribute | NumberAttribute;

const foo: Attribute = {
    type: "string"
}
