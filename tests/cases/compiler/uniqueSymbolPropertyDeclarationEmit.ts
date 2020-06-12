// @noTypesAndSymbols: true
// @esModuleInterop: true
// @declaration: true

// @Filename: test.ts
import Op from './op';
import { Po } from './po';

export default function foo() {
  return {
    [Op.or]: [],
    [Po.ro]: {}
  };
}

// @Filename: op.ts
declare const Op: {
  readonly or: unique symbol;
};

export default Op;

// @Filename: po.d.ts
export declare const Po: {
  readonly ro: unique symbol;
};
