export function formatNumberWithCommas(number: type) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};