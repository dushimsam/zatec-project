export function openInNewTabWinBrowser(url) {
    var win = window.open(url, '_blank');
    win.focus();
}


export const isThisFormValid = (form) => {
    let keys = Object.keys(form)
    for (const key of keys) if (!form[key]) return false
    return true
}
