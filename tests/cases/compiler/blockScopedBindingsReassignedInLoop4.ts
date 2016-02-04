function f1() {
    for (let x = 1, y = 2; x < y; ++x, --y) {
        let a = () => x++ + y++;
        if (x == 1) {
            return 1;
        }
        else {
            y = 5;
        }
    }
}