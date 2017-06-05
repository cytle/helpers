const { setItem, getItem, removeItem, clear } = window.sessionStorage;

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
