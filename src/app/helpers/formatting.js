import { _isInvalid } from 'Helpers/data';

export function _camelize(text) {
    return text.replace(/^([A-Z])|[\s-]+(\w)/g, (match, p1, p2) => {
        if (p2) return p2.toUpperCase();

        return p1.toLowerCase();
    });
}

export function _decamelize(str, separator) {
    separator = typeof separator === 'undefined' ? '_' : separator;

    return str
        .replace(/([a-z\d])([A-Z])/g, `$1${separator}$2`)
        .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, `$1${separator}$2`)
        .toLowerCase();
}

/**
 *
 *
 * @description Přidá desetinou čárku a mezery pro zobrazení číselných výsledků.
 * @export
 * @param {any} value
 * @returns
 */
export function _addNumberSeparators(value) {
    const isNaN = Number.isNaN(value);
    const isNegative = value < 0;

    value = Math.round(value * 100) / 100;

    if (!isNaN) {
        const numbers = value.toString().replace('-', '').replace('.', ',').split('');
        numbers.reverse();

        const formatedArray = [];

        let i = 1;
        numbers.forEach(number => {
            formatedArray.push(number);

            if (i % 3 === 0) {
                formatedArray.push(' ');
            }

            i += 1;
        });

        let formated = isNegative ? '-' : '';
        formated += formatedArray.reverse().join('').trim();

        return formated;
    } else {
        return '-';
    }
}

/**
 *
 *
 * @description Omezí počet zobrazovaných desetiných čísel pro zobrazení číselných výsledků.
 * @export
 * @param {any} value
 * @param {number} [decimalsCount=2]
 * @returns
 */
export function _limitDecimals(value, decimalsCount = 2) {
    const afterDotCount = 10 ** decimalsCount;

    return (Math.round(value * afterDotCount) / afterDotCount).toString().replace('.', ',');
}

export function _removeLeadingZeros(value) {
    return value.replace(/$0+/g, '');
}

export function _boolToLabel(value) {
    if (value.toString() === 'true') {
        return 'Ano';
    } else {
        return 'Ne';
    }
}

export function _formatCurrency(value) {
    value = value.toString();
    const split = value.split('.');
    let decimals;

    if (_isInvalid(split[1])) {
        decimals = '0'.repeat(2);
    } else if (split[1].length <= 2) {
        const zeros = '0'.repeat(2 - split[1].length);

        decimals = `${split[1]}${zeros}`;
    } else if (split[1].length === 2) {
        decimals = split[1];
    } else {
        decimals = split[1].substring(0, 2);
    }

    return `${_addNumberSeparators(split[0])},${decimals} Kč`;
}
