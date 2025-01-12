const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));

function stringInsert(str, char, pos) {
    return str.slice(0, pos) + char + str.slice(pos);
}