const _timeout = ms =>  { 
    let id;

    const promise = new Promise(resolve => { 
        id = setTimeout(resolve, ms)
    }); 

    return [promise, id]
}

const timeout = ms =>  new Promise(resolve => setTimeout(resolve, ms))

function stringInsert(str, char, pos) {
    return str.slice(0, pos) + char + str.slice(pos);
}