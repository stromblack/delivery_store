import { Store } from "pullstate";

export const AddressStore = new Store({
    address_list: [
        {
            current: true, 
            name_address: 'logic envy',
            phone_address: '(+66) 92 472 8497',
            detail_address: '141 abc street newyork city, 10200'
        },
        {
            current: false, 
            name_address: 'teddy gogo',
            phone_address: '(+66) 12 456 7890',
            detail_address: '221 abc street london city, 11511'
        }
    ]
});

export const addToAddress = (address) => {
    AddressStore.update(s => { s.address_list = [...s.address_list, address]; });
}

export const selectAddress = (index) => {
    AddressStore.update(s => { s.address_list.forEach((address, aindex) => {
        if (aindex === index) address.current = true;
        else address.current = false;
    }); })
}

export const removeFromAddress = (index) => {
    AddressStore.update(s => { s.address_list.splice(index, 1) });
}