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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// legal JS, if nonsensical, which also triggers the issue
const { date, } = (inspectedElement) => 0;
date.toISOString();
// Working flow code
const { date2, } = (inspectedElement) => , props;
date2.toISOString();
// It could also be an async function
const { constructor } = () => __awaiter(this, void 0, void 0, function* () { });
