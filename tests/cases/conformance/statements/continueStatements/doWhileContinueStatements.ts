// @allowUnreachableCode: true

do {
    continue;
} while(true)

ONE:
do {
    continue ONE;
}
while (true)

TWO:
THREE:
do {
    continue THREE;
}while (true)

FOUR:
do {
    FIVE:
    do {
        continue FOUR;
    }while (true)
}while (true)

do {
    SIX:
    do continue SIX; while(true)
}while (true)

SEVEN:
do do do continue SEVEN; while (true) while (true)  while (true)

EIGHT:
do{
    var fn = function () { }
    continue EIGHT;
}while(true)
