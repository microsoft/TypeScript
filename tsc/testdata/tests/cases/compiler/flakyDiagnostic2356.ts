// @declaration: true

declare let text: string;
export enum Values {
    [(text++).valueOf] = 1,
}
