import { customAlphabet } from 'nanoid';

const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
// FIXME @darcy: Temporary use this workaround, this change has been made in @logto/core-kit but has not been published yet.
export const buildIdGenerator = (size: number) => customAlphabet(alphabet, size);
