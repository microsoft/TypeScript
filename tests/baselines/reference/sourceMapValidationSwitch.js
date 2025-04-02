//// [tests/cases/compiler/sourceMapValidationSwitch.ts] ////

//// [sourceMapValidationSwitch.ts]
var x = 10;
switch (x) {
    case 5:
        x++;
        break;
    case 10:
        {
            x--;
            break;
        }
    default:
        x = x *10;
}
switch (x)
{
    case 5:
        x++;
        break;
    case 10:
        {
            x--;
            break;
        }
    default:
        {
            x = x * 10;
        }
}

//// [sourceMapValidationSwitch.js]
var x = 10;
switch (x) {
    case 5:
        x++;
        break;
    case 10:
        {
            x--;
            break;
        }
    default:
        x = x * 10;
}
switch (x) {
    case 5:
        x++;
        break;
    case 10:
        {
            x--;
            break;
        }
    default:
        {
            x = x * 10;
        }
}
//# sourceMappingURL=sourceMapValidationSwitch.js.map