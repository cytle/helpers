const location = window.location;

export function navigateTo (url) {
    location.href = url;
}
export function redirectTo (url) {
    location.replace(url);
}
export function navigateBack () {
    location.go(-1);
}

export default {
    navigateTo,
    redirectTo,
    navigateBack,
    get search () {
        return location.search;
    },
    get href () {
        return location.href;
    }
};
