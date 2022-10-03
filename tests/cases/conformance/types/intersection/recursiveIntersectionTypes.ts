type LinkedList<T> = T & { next: LinkedList<T> };

interface Entity {
    name: string;
}

interface Product extends Entity {
    price: number;
}

var entityList: LinkedList<Entity>;
var s = entityList.name;
var s = entityList.next.name;
var s = entityList.next.next.name;
var s = entityList.next.next.next.name;

var productList: LinkedList<Product>;
entityList = productList;
productList = entityList;  // Error
