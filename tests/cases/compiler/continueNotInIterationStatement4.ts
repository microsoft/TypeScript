// @target: es2015
// @allowUnusedLabels: true

TWO:
while (true){
  var x = () => {
    continue TWO;
  }
}
