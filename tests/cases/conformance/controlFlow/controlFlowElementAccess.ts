let x: { o: boolean } = { o: false }
if (x['o'] === false) {
    x['o'] = true
}

const y: [number, number] = [0, 0];
if (y[0] === 0) {
    y[0] = -1;
}
