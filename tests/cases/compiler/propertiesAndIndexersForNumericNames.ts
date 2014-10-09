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
