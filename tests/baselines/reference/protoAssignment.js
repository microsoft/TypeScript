//// [protoAssignment.ts]
interface Number extends Comparable<number> {

    compareTo(other: number);

}

Number.prototype.compareTo = function (other: number) {

   return this.valueOf() == other;

}

 


//// [protoAssignment.js]
Number.prototype.compareTo = function (other) {
    return this.valueOf() == other;
};
