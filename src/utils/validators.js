import { EMAIL_REGEX, URL_REGEX, ALPHABET_REGEX } from '../constants/index.js';

export const isFieldExist = (data) => !!data;

export const isAtLeastThreeChars = (data) => data.length > 3;

export const isValidEmailId = (data) => EMAIL_REGEX.test(data);

export const isValidUrl = (data) => URL_REGEX.test(data);

export const isOnlyAlphabets = (data) => ALPHABET_REGEX.test(data);
