//// [protoAssignment.js]
Number.prototype.compareTo = function (other) {
    return this.valueOf() == other;
};
