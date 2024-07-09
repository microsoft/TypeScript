// @noimplicitany: true
// @declaration: true
type Arg = {
    a: number;
};
export class Bar {
    private bar({ a, }: Arg): number {
        return a;
    }
}
export declare class Bar2 {
    private bar({ a, });
}