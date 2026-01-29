//// [tests/cases/compiler/uniqueSymbolPropertyDeclarationEmit.ts] ////

//// [test.ts]
import Op from './op';
import { Po } from './po';

export default function foo() {
  return {
    [Op.or]: [],
    [Po.ro]: {}
  };
}

//// [op.ts]
declare const Op: {
  readonly or: unique symbol;
};

export default Op;

//// [po.d.ts]
export declare const Po: {
  readonly ro: unique symbol;
};


//// [op.js]
export default Op;
//// [test.js]
import Op from './op';
import { Po } from './po';
export default function foo() {
    return {
        [Op.or]: [],
        [Po.ro]: {}
    };
}


//// [op.d.ts]
declare const Op: {
    readonly or: unique symbol;
};
export default Op;
//// [test.d.ts]
import Op from './op';
import { Po } from './po';
export default function foo(): {
    [Op.or]: any[];
    [Po.ro]: {};
};
