// @declaration: true
// @isolatedDeclarationFixedDiffReason: Printing differences
// @filename: EnumExample.ts
enum EnumExample {
    TEST = 'TEST',
}

export default EnumExample;

// @filename: index.ts
import EnumExample from './EnumExample';

export default {
    [EnumExample.TEST]: {},
};