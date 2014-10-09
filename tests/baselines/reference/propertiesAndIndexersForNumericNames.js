//// [propertiesAndIndexersForNumericNames.ts]
class C {
  [i: number]: number;
  public "1": string = "number"; // Error
  public "-1": string = "negative number"; // Error
  public "+1": string = "positive number (for the paranoid)"; // Error
  
  public " 1": string = "leading space"; // No error
  public "1    ": string = "trailing space"; // No error
  public "": string = "no nothing"; // No error
  public "    ": string = "just space"; // No error
  public "1 0 1": string = "several numbers and spaces"; // No error
  public "NaN": string = "not a number"; // No error
  public "-NaN": string = "not a negative number"; // No error
  public "+Infinity": string = "A gillion"; // No error
  public "-Infinity": string = "Negative-a-gillion"; // No error
}


//// [propertiesAndIndexersForNumericNames.js]
var C = (function () {
    function C() {
        this["1"] = "number"; // Error
        this["-1"] = "negative number"; // Error
        this["+1"] = "positive number (for the paranoid)"; // Error
        this[" 1"] = "leading space"; // No error
        this["1    "] = "trailing space"; // No error
        this[""] = "no nothing"; // No error
        this["    "] = "just space"; // No error
        this["1 0 1"] = "several numbers and spaces"; // No error
        this["NaN"] = "not a number"; // No error
        this["-NaN"] = "not a negative number"; // No error
        this["+Infinity"] = "A gillion"; // No error
        this["-Infinity"] = "Negative-a-gillion"; // No error
    }
    return C;
})();
