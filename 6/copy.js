function cloneDeep(obj) {
    let newObj = {...obj};
    for(const prop in newObj) {
        if(typeof newObj[prop] === "object") {
            newObj[prop] = cloneDeep(newObj[prop]);
        }
    }
    return newObj;
}

const user = {
    name: "Alice",
    surname: "Young",
    contact: {
      phone: '111-111-111',
      address: {
        city: "London",
      }
    }
  };
  
const userCp = cloneDeep(user);
  
user.name = "John";
user.surname = "White";
user.contact.phone = '222-222-222';
user.contact.address.city = 'New York'
  
console.log(user);
console.log(userCp);