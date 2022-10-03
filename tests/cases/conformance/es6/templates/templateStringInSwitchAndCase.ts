switch (`abc${0}abc`) {
    case `abc`:
    case `123`:
    case `abc${0}abc`:
        `def${1}def`;
}