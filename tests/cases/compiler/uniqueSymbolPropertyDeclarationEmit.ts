// @noTypesAndSymbols: true
// @esModuleInterop: true
// @declaration: true

// @Filename: test.ts
import Op from './op';

export default function foo() {
  return {
    [Op.or]: [],
  };
}

// @Filename: op.ts
declare const Op: {
  readonly or: unique symbol;
};

export default Op;
