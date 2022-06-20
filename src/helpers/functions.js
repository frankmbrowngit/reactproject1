export const capitalize = value => {
    if (!value || typeof value !== 'string') {return '';}
    return value
    .split(' ') // san fransisco => ['san','fransisco']
    .map((word) => word[0].toUpperCase() + word.slice(1)) //  => ['San', 'Fransisco']
    .join(' ') // => San Fransisco
}

export const dateFormat = (date) => {
    let day = date.toString().slice(8,10);
    date = new Date(date);
    let year = date.getFullYear().toString();
    let month = (date.getMonth() < 10) ? ("0" + date.getMonth().toString()) : (date.getMonth().toString());
    return year + "/" + month + "/" + day;
}