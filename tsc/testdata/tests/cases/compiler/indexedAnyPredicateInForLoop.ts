// @target: es2015
// @strict: true
declare function isPrimitive(value: any): value is string | number;
declare function createText(text: string | undefined): object;
function normalize(children: any) {
    for (let index = 0; index < children.length; ++index) {
        if (isPrimitive(children[index])) {
            children[index] = createText(children[index]);
        }
    }
}
