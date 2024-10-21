import { emojiMap } from "../data/emoji";

/**
 * Replaces emoji shortcodes in a string with actual emoji symbols.
 * @param {string} text - The text containing emoji shortcodes.
 * @returns {string} - The text with shortcodes replaced by emojis.
 */
export const replaceEmojis = (text: string) => {
    const regex = /:([a-zA-Z0-9_+-]+):/g;
    return text.replace(regex, (match, p1) => {
        const emoji = emojiMap[p1];
        return emoji ? emoji : match;
    });
};
