export function setItem (name, value) {
    wx.setStorageSync(name, value + '');
}

export function getItem (name) {
    return wx.getStorageSync(name);
}

export function removeItem (name) {
    wx.removeStorageSync(name);
}

export function clear () {
    wx.clearStorage();
}

export function getJSON (name) {
    return JSON.parse(getItem(name));
}

export default exports;
