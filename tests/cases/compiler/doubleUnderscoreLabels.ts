function doThing() {
    __call: while (true) {
        aLabel: for (let i = 0; i < 10; i++) {
            if (i === 3) {
                break __call;
            }
            if (i === 5) {
                break aLabel;
            }
        }
    }
}
doThing();