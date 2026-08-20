// @target: es2015
TWO:
while (true){
  var x = () => {
    continue TWO;
  }
}
