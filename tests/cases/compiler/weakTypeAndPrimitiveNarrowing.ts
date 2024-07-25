// @strict: true

type LiteralsAndWeakTypes = 
  | 'A'
  | 'B'
  | { optional?: true }
  | { toLowerCase?(): string }
  | { toUpperCase?(): string, otherOptionalProp?: number };

const g = (arg: LiteralsAndWeakTypes) => {
    if (arg === 'A') {
      arg;
    } else {
      arg;
    }
}

type PrimitivesAndWeakTypes =
  | string
  | number
  | { optional?: true }
  | { toLowerCase?(): string }
  | { toUpperCase?(): string, otherOptionalProp?: number };

const h = (arg: PrimitivesAndWeakTypes) => {
    if (arg === 'A') {
      arg;
    } else {
      arg;
    }
}
