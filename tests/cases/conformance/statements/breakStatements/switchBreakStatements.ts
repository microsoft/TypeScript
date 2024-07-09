// @allowUnusedLabels: true
// @allowUnreachableCode: true

switch ('') {
    case 'a':
        break;
}

ONE:
switch ('') {
    case 'a':
        break ONE;
}

TWO:
THREE:
switch ('') {
    case 'a':
        break THREE;
}

FOUR:
switch ('') {
    case 'a':
        FIVE:
        switch ('') {
            case 'a':
                break FOUR;
        }
}

switch ('') {
    case 'a':
        SIX:
        switch ('') {
            case 'a':
                break SIX;
        }
}

SEVEN:
switch ('') {
    case 'a':
        switch ('') {
            case 'a':
                switch ('') {
                    case 'a':
                        break SEVEN;
                        EIGHT:
                        switch ('') {
                            case 'a':
                                var fn = function () { }
                                break EIGHT;
                        }
                }
        }
}
