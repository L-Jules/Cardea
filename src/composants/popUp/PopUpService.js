let alertRef = null;

export const setAlertRef = (ref) => {
    alertRef = ref;
};

export function showPopUp(title, message, onPress){
    alertRef?.show({title, message, onPress});
}

export function warm(message, onPress) {
    showPopUp("Attention", message, onPress);
}

export function info(message, onPress) {
    showPopUp("Info", message, onPress);
}

export function error(message, onPress) {
    showPopUp("Error", message, onPress);
}