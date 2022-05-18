// @strict: true
// @declaration: true
interface Food2b {
    bard?: {
        getValues(): number[];
    }
}
declare const food2b: Food2b | undefined;
const bards = food2b?.bard?.getValues();
if (bards) {
    food2b; // type Food2b, OK  
    food2b.bard; // type { getValues(): number[] } | undefined. --- BUG 
    food2b.bard.getValues(); // error --- BUG
}

