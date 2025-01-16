interface HTMLDataAttributes {
    [data: `data-${string}`]: unknown
}

interface Base {
    id: string;
    prop01: string;
    prop02: string;
    prop03: string;
    prop04: string;
    prop05: string;
    prop06: string;
    prop07: string;
    prop08: string;
    prop09: string;
    prop10: string;
    prop11: string;
    prop12: string;
    prop13: string;
    prop14: string;
    prop15: string;
    prop16: string;
    prop17: string;
    prop18: string;
    prop19: string;
    prop20: string;
    prop21: string;
    prop22: string;
    prop23: string;
    prop24: string;
    prop25: string;
    prop26: string;
    prop27: string;
    prop28: string;
    prop29: string;
    prop30: string;
    prop31: string;
    prop32: string;
    prop33: string;
    prop34: string;
    prop35: string;
    prop36: string;
    prop37: string;
  }
  
  interface A extends Base, HTMLDataAttributes {
    a1: string;
    a2: string;
    a3: string;
    a4: string;
    a5: string;
    a6: string;
    a7: string;
    a8: string;
  }
  
  interface B extends Base, HTMLDataAttributes {
    b1: string;
    b2: string;
    b3: string;
    b4: string;
    b5: string;
    b6: string;
    b7: string;
    b8: string;
  }
  
  interface C extends Base, HTMLDataAttributes {
    c1: string;
    c2: string;
    c3: string;
    c4: string;
    c5: string;
    c6: string;
    c7: string;
    c8: string;
  }
  
  const xyz: Pick<A | B | C, 'id'> = {id: 'id'}