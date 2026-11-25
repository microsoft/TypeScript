// @strict: true
// @noEmit: true
// @target: esnext

// The type of data in TokenNode is assignable to its inherited index
// signature, which mentions it through an indexed access.

interface BaseNode {
  kind: string;
  [key: string]: string | TokenNode["data"];
}

interface TokenNode extends BaseNode {
  kind: 'token';
  data: TokenData;
}

interface TokenData {
  offset: number;
  width: number;
  leading_width: number;
  trailing_width: number;
}
