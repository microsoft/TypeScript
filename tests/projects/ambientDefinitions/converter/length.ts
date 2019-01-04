function formatInches(i: number) {
    if (i < 12) {
        return `${i}"`;
    }
    const ft = Math.floor(i / 12);
    i = i - ft * 12;
    return `${ft}' ${leftPad(i.toString(), 2)}`;
}