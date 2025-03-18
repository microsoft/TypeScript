//// [tests/cases/compiler/destructuringControlFlowNoCrash.ts] ////

//// [destructuringControlFlowNoCrash.ts]
// legal JS, if nonsensical, which also triggers the issue
const {
  date,
} = (inspectedElement: any) => 0;

date.toISOString();

// Working flow code
const {
  date2,
} = (inspectedElement: any).props;

date2.toISOString();

// It could also be an async function
const { constructor } = async () => {};


//// [destructuringControlFlowNoCrash.js]
const { date, } = (inspectedElement) => 0;
date.toISOString();
const { date2, } = (inspectedElement) => , props;
date2.toISOString();
const { constructor } = async () => { };
