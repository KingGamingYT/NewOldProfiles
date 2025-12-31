import { intl } from '@modules/common';

export function getIntlString(hash, parameter) {
    if (parameter) return intl.intl.formatToPlainString(intl.t[`${hash}`], parameter); 
    return intl.intl.formatToPlainString(intl.t[`${hash}`]);
}