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


//// [destructuringControlFlowNoCrash.js]
// legal JS, if nonsensical, which also triggers the issue
var date = function (inspectedElement) { return 0; }.date;
date.toISOString();
// Working flow code
var date2 = function (inspectedElement) { return ; }.date2, props;
date2.toISOString();
