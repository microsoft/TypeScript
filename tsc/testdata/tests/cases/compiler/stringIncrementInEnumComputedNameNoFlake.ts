// @declaration: true

// TS2356: An arithmetic operand must be of type 'any', 'number', 'bigint' or an enum type.
declare let text: string;
export enum Values {
    [(text++).valueOf] = 1,
}
