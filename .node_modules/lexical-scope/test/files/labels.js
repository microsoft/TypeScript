test_label1: while(true) {
  break test_label1;
  continue test_label1;
}

function nest() {
test_label2: while(true) {
    break test_label2;
    continue test_label2;
  }
};