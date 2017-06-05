let values = {};

export function setItem (name, value) {
    values[name] = value + '';
}

export function getItem (name) {
    return values[name] || '';
}

export function removeItem (name) {
    if (name in values) {
        delete values[name];
    }
}

export function clear () {
    values = {};
}

export function getJSON (name) {
    return JSON.parse(getItem(name));
}

export default exports;
