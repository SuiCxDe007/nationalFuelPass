/**
 * start only 07
 * ex : 0711234567
 */
export const CONTACT_NUMBER_REGEX = /^07[\d]{8}$/

/**
 * Allowed Alphanumeric
 * and . , + - /
 */
export const ADDRESS_REGEX = /^[a-zA-Z 0-9\.\,\+\-\/]*$/

/**
 * Allowed Alphanumeric
 *
 */
export const FIRSTNAME_REGEX = /^[a-zA-Z\ ]+$/

/**
 * Allowed Alphanumeric
 *
 */
export const LASTNAME_REGEX = /^[a-zA-Z\ ]+$/

/**
 * Allowed Alphanumeric
 *
 */
export const V_NUMBER_PREFIX_REGEX = /^[A-Za-z0-9 \ ]+$/

/**
 * start only 07
 * ex : 0711234567
 */
export const OTP_NUMBER_REGEX = /^[\d]{6}$/
