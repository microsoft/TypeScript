interface User {
    name: string;
    age: number;
    contact: {
        email: string;
        phone: string;
        address: {
            street: string;
            country: string;
            zipcode: number;
        }
    };
    password: string;
}

type PersonalInformation = Subset<User, {
    name: string;
    age: number;
}>; // Fine

const test: PersonalInformation = {
    name: 'Hans',
    age: 21,
    password: 'string' // Error: password does not exist in type
};

type WronglyTypedPersonalInformation = Subset<User, {
    name: string;
    age: string; // Error: Types of property age are incompatible
}>;

type ExcessPersonalInformation = Subset<User, {
    name: string;
    favoriteColor: string; // Error: Property favoriteColor is missing in type User
}>;

// This also works for "deep" properties

type ShippingInformation = Subset<User, {
    name: string;
    contact: {
        address: {
            street: string;
            zipcode: number;
        }
    }
}>; // Fine (Omitting properties of nested properties is ok too)

type WronglyTypedShippingInformation = Subset<User, {
    name: string;
    contact: {
        address: {
            street: {
                name: string;
                nr: number;
            }; // Error: Types of property street are incompatible
            zipcode: number;
        }
    }
}>;

type ExcessShippingInformation = Subset<User, {
    name: string;
    contact: {
        address: {
            street: string;
            zipcode: number;
            state: string; // Error: Property state is missing in type User
        }
    }
}>;
