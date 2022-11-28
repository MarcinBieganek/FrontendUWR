function cloneDeep(obj) {
    let newObj = {...obj};
    for(const prop in newObj) {
        if(newObj[prop] instanceof Date) {
            newObj[prop] = new Date(obj[prop].getTime());
        } else if(typeof newObj[prop] === "object") {
            newObj[prop] = cloneDeep(newObj[prop]);
        }
    }
    return newObj;
}

const user = {
    name: "Alice",
    surname: "Young",
    dates: {
        birthDate: new Date(1995, 10, 28)
    },
    contact: {
        phone: '111-111-111',
        address: {
            city: "London",
        }
    }
};

console.log(user);

const userCp = cloneDeep(user);
  
user.name = "John";
user.surname = "White";
user.dates.birthDate = new Date(1999, 11, 11);
user.contact.phone = '222-222-222';
user.contact.address.city = 'New York'
  
console.log(user);
console.log(userCp);