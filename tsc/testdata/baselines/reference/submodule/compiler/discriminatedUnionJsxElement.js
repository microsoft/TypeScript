//// [tests/cases/compiler/discriminatedUnionJsxElement.tsx] ////

//// [discriminatedUnionJsxElement.tsx]
// Repro from #46021

interface IData<MenuItemVariant extends ListItemVariant = ListItemVariant.OneLine> {
    menuItemsVariant?: MenuItemVariant;
}

function Menu<MenuItemVariant extends ListItemVariant = ListItemVariant.OneLine>(data: IData<MenuItemVariant>) {
    const listItemVariant = data.menuItemsVariant ?? ListItemVariant.OneLine;
    return <ListItem variant={listItemVariant} />;
}

type IListItemData = { variant: ListItemVariant.Avatar; } | { variant: ListItemVariant.OneLine; };

enum ListItemVariant {
    OneLine,
    Avatar,
}

function ListItem(_data: IListItemData) {
    return null; 
}


//// [discriminatedUnionJsxElement.jsx]
function Menu(data) {
    const listItemVariant = data.menuItemsVariant ?? ListItemVariant.OneLine;
    return <ListItem variant={listItemVariant}/>;
}
var ListItemVariant;
(function (ListItemVariant) {
    ListItemVariant[ListItemVariant["OneLine"] = 0] = "OneLine";
    ListItemVariant[ListItemVariant["Avatar"] = 1] = "Avatar";
})(ListItemVariant || (ListItemVariant = {}));
function ListItem(_data) {
    return null;
}
