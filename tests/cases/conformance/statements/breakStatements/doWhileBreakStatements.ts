// @allowUnusedLabels: true
// @allowUnreachableCode: true

do {
    break;
} while(true)

ONE:
do {
    break ONE;
}
while (true)

TWO:
THREE:
do {
    break THREE;
}while (true)

FOUR:
do {
    FIVE:
    do {
        break FOUR;
    }while (true)
}while (true)

do {
    SIX:
    do break SIX; while(true)
}while (true)

SEVEN:
do do do break SEVEN; while (true) while (true)  while (true)

EIGHT:
do{
    var fn = function () { }
    break EIGHT;
}while(true)
