// TODO
let href = '';
let search = '';

export function navigateTo (url) {
    wx.navigateTo({ url });
}
export function redirectTo (url) {
    wx.redirectTo({ url });
}
export function navigateBack () {
    wx.navigateBack();
}

export default {
    navigateTo,
    redirectTo,
    navigateBack,
    search,
    href
};
