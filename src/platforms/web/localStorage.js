
const { setItem, getItem, removeItem, clear } = window.localStorage;

function getJSON (name) {
    return JSON.parse(getItem(name));
}

export {
    setItem,
    getItem,
    removeItem,
    clear,
    getJSON
};

export default exports;
