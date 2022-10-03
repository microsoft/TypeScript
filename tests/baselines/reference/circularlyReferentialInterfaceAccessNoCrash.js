//// [circularlyReferentialInterfaceAccessNoCrash.ts]
type Mxs = Mx<'list', Mxs['p1']>;

interface Mx<T, K> {
  p1: T;
  p2: K;
}

type ArrElem = ['list', ArrElem[number][0]][];

type TupleElem = [['list', TupleElem[0][0]]];


//// [circularlyReferentialInterfaceAccessNoCrash.js]
