export const capitalize = value => {
    if (!value || typeof value !== 'string') {return '';}
    return value
    .split(' ') // san fransisco => ['san','fransisco']
    .map((word) => word[0].toUpperCase() + word.slice(1)) //  => ['San', 'Fransisco']
    .join(' ') // => San Fransisco
}