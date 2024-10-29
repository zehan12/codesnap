/**
 * Calculates the relative luminance of a color based on RGB values.
 * @param r - Red component (0-255)
 * @param g - Green component (0-255)
 * @param b - Blue component (0-255)
 * @returns Luminance value (0-1)
 */
const calculateLuminance = (r: number, g: number, b: number): number => {
    // Normalize the RGB values to the range [0, 1]
    r = r / 255;
    g = g / 255;
    b = b / 255;

    // Apply the luminance formula with gamma correction
    return (
        0.2126 * (r <= 0.03928 ? r / 12.92 : ((r + 0.055) / 1.055) ** 2.4) +
        0.7152 * (g <= 0.03928 ? g / 12.92 : ((g + 0.055) / 1.055) ** 2.4) +
        0.0722 * (b <= 0.03928 ? b / 12.92 : ((b + 0.055) / 1.055) ** 2.4)
    );
};

/**
 * Calculates the contrast ratio between two colors given their RGB components.
 * @param r1 - Red component of color 1
 * @param g1 - Green component of color 1
 * @param b1 - Blue component of color 1
 * @param r2 - Red component of color 2
 * @param g2 - Green component of color 2
 * @param b2 - Blue component of color 2
 * @returns Contrast ratio between the two colors
 */
const calculateContrastRatio = (
    r1: number,
    g1: number,
    b1: number,
    r2: number,
    g2: number,
    b2: number
): number => {
    // Calculate the luminance of both colors
    const l1 = calculateLuminance(r1, g1, b1);
    const l2 = calculateLuminance(r2, g2, b2);

    // Compute and return the contrast ratio
    return l1 > l2 ? (l1 + 0.05) / (l2 + 0.05) : (l2 + 0.05) / (l1 + 0.05);
};

/**
 * Converts a hexadecimal color string to RGB values.
 * @param hex - Hexadecimal color string (e.g., '#FF5733')
 * @returns Array of RGB values [r, g, b]
 */
const hexToRgb = (hex: string): number[] => {
    // Remove any leading '#' and unwanted characters like dots or hyphens
    hex = hex.replace(/^#/, "").replace(/[-.]/g, "");

    // If the hex string is not 3 or 6 characters, return black (0, 0, 0)
    if (hex.length !== 3 && hex.length !== 6) {
        return [0, 0, 0];
    }

    // Expand shorthand hex format (e.g., 'abc' to 'aabbcc')
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }

    // Parse the hex string into integer RGB values
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return [r, g, b];
};

/**
 * Converts RGB values to a hexadecimal color string.
 * @param r - Red component (0-255)
 * @param g - Green component (0-255)
 * @param b - Blue component (0-255)
 * @returns Hexadecimal color string
 */
const rgbToHex = (r: number, g: number, b: number): string => {
    // Ensure RGB values are within the range [0, 255]
    r = Math.max(0, Math.min(255, r));
    g = Math.max(0, Math.min(255, g));
    b = Math.max(0, Math.min(255, b));

    // Convert each component to a 2-digit hex value and concatenate
    return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;
};

/**
 * Converts a single RGB component to a 2-character hexadecimal string.
 * @param c - Color component (0-255)
 * @returns Hexadecimal string
 */
const componentToHex = (c: number): string => {
    // Convert the component to a hexadecimal string
    const hex = c.toString(16);
    // Ensure the hex string has two characters (prepend '0' if necessary)
    return hex.length === 1 ? "0" + hex : hex;
};

/**
 * Modifies an array of HSL colors with new saturation and lightness values.
 * @param hslColors - Array of HSL color strings
 * @param saturationValues - Array of new saturation percentages
 * @param lightnessValues - Array of new lightness percentages
 * @returns Array of modified HSL colors
 */
const modifyColors = (
    hslColors: string[],
    saturationValues: number[],
    lightnessValues: number[]
): string[] => {
    const modifiedHslColors: string[] = [];

    // Iterate through each HSL color and apply modifications
    for (let i = 0; i < hslColors.length; i++) {
        const hslColor = hslColors[i];
        const lightnessValue = lightnessValues[i];
        const saturationValue = saturationValues[i];

        // Extract the hue value from the HSL string using a regular expression
        const currentHue = hslColor.match(/hsl\((\d+), (\d+)%, (\d+)%\)/)![1];

        // Construct a new HSL color string with the modified values
        const modifiedHslColor = `hsl(${currentHue}, ${saturationValue}%, ${lightnessValue}%)`;

        modifiedHslColors.push(modifiedHslColor);
    }

    return modifiedHslColors;
};

/**
 * Converts a CSS color string (e.g., 'rgb(255, 0, 0)') to an RGB array.
 * @param cssColor - CSS color string (e.g., 'rgba(255, 0, 0, 0.5)')
 * @returns Array of RGB values [r, g, b]
 * @throws Error if the input string is not a valid CSS color
 */
const cssColorToRgb = (cssColor: string): number[] => {
    // Use a regular expression to match RGB or RGBA color strings
    const matches = cssColor.match(
        /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)/
    );

    // If the input string is not valid, throw an error
    if (!matches) {
        throw new Error(`Invalid color string: ${cssColor}`);
    }

    // Parse and return the RGB components as an array
    return [
        parseInt(matches[1], 10),
        parseInt(matches[2], 10),
        parseInt(matches[3], 10),
    ];
};

/**
 * Converts an array of hex colors to HSL format and applies modifications.
 * @param colors - Array of hex color strings (e.g., ['#FF5733', '#33FF57'])
 * @returns Array of modified HSL color strings
 */
const convertToHSL = (colors: string[]): string[] => {
    const hslColors: string[] = [];

    // Iterate through each hex color
    for (const color of colors) {
        // Extract the red, green, and blue components from the hex string
        const r = parseInt(color.slice(1, 3), 16);
        const g = parseInt(color.slice(3, 5), 16);
        const b = parseInt(color.slice(5, 7), 16);

        // Normalize the RGB values to the range [0, 1]
        const rNormalized = r / 255;
        const gNormalized = g / 255;
        const bNormalized = b / 255;

        // Find the maximum and minimum values among the normalized RGB components
        const max = Math.max(rNormalized, gNormalized, bNormalized);
        const min = Math.min(rNormalized, gNormalized, bNormalized);

        let h = 0; // Hue
        let s = 0; // Saturation
        let l = (max + min) / 2; // Lightness

        // Calculate hue, saturation, and lightness based on max and min values
        if (max !== min) {
            const d = max - min; // Delta between max and min
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            h =
                max === rNormalized
                    ? (gNormalized - bNormalized) / d +
                      (gNormalized < bNormalized ? 6 : 0)
                    : max === gNormalized
                    ? (bNormalized - rNormalized) / d + 2
                    : (rNormalized - gNormalized) / d + 4;
            h /= 6; // Normalize hue to [0, 1]
        }

        // Convert HSL values to a formatted string and add to the result array
        hslColors.push(
            `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(
                l * 100
            )}%)`
        );
    }

    // Modify the HSL colors with predefined saturation and lightness values
    return modifyColors(hslColors, [70, 80, 90, 100, 30], [90, 80, 65, 50, 40]);
};

/**
 * Generates a set of colors based on input hex colors, ensuring contrast ratios.
 * @param colors - Array of hex color strings
 * @returns Array of generated colors in HSL format
 */
export const generateColors = (colors: string[]): string[] => {
    let avgR = 0,
        avgG = 0,
        avgB = 0;

    // Reference color used for contrast calculations
    const [rRef, gRef, bRef] = cssColorToRgb("rgba(0,0,0,0.7)");

    // Calculate average RGB values if colors are provided
    if (colors.length > 0) {
        let totalR = 0,
            totalG = 0,
            totalB = 0;

        colors.forEach((color) => {
            const [r, g, b] = hexToRgb(color);
            totalR += r;
            totalG += g;
            totalB += b;
        });

        avgR = Math.floor(totalR / colors.length);
        avgG = Math.floor(totalG / colors.length);
        avgB = Math.floor(totalB / colors.length);
    }

    // Generate new hex colors based on the average RGB values
    let color3 = rgbToHex(avgR + 20, avgG - 20, avgB - 20);
    let color4 = rgbToHex(avgR - 20, avgG + 20, avgB + 20);
    let color5 = rgbToHex(avgR + 10, avgG + 10, avgB - 30);
    let color6 = rgbToHex(avgR - 30, avgG - 10, avgB + 10);
    let color7 = rgbToHex(avgR + 20, avgG - 10, avgB + 20);

    const minContrastRatio = 7;

    // Adjust colors to ensure they meet the minimum contrast ratio
    [color3, color4, color5, color6, color7] = [
        color3,
        color4,
        color5,
        color6,
        color7,
    ].map((color) => {
        const [r, g, b] = hexToRgb(color);
        const contrastRatio = calculateContrastRatio(r, g, b, rRef, gRef, bRef);

        if (contrastRatio < minContrastRatio) {
            const factor = (minContrastRatio + 0.05) / contrastRatio;
            return rgbToHex(
                Math.min(255, Math.round(r * factor)),
                Math.min(255, Math.round(g * factor)),
                Math.min(255, Math.round(b * factor))
            );
        }
        return color;
    });

    // Convert adjusted colors to HSL format
    const hslColors = convertToHSL([color3, color4, color5, color6, color7]);

    // Further modify the HSL colors with new saturation and lightness values
    const adjustedColors = modifyColors(
        hslColors,
        [100, 93, 98, 100, 91],
        [90, 80, 70, 60, 50]
    );

    // Shift the hue of the adjusted colors and return the combined result
    const shiftedColors = shiftHue(adjustedColors);

    return [...adjustedColors, ...shiftedColors];
};

/**
 * Shifts the hue of an array of HSL colors by specified degrees.
 * @param colors - Array of HSL color strings
 * @returns Array of hue-shifted colors
 */
export const shiftHue = (colors: string[]): string[] => {
    const shiftedColors: string[] = [];

    // Shift each color by -45 and +45 degrees
    for (const degree of [-45, 45]) {
        for (const color of colors) {
            const match = color.match(
                /hsl\((\d+), (\d+)%, (\d+)%\)/
            ) as RegExpMatchArray;
            const hue = parseInt(match[1], 10);
            const saturation = match[2];
            const lightness = match[3];

            // Calculate the new hue, wrapping around if necessary
            const shiftedHue = (hue + degree + 360) % 360;
            shiftedColors.push(
                `hsl(${shiftedHue}, ${saturation}%, ${lightness}%)`
            );
        }
    }

    return shiftedColors;
};

/**
 * Converts an HSL color string to HSLA by adding an alpha value.
 * @param color - HSL color string (e.g., 'hsl(500, 50%, 50%)')
 * @param a - Alpha value (0-1)
 * @returns HSLA color string
 * @throws Error if the input is not a valid HSL color
 */
export const hslToHsla = (color: string, a: number): string => {
    const values = color.match(/^hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)$/);

    if (!values) {
        console.error(`Invalid HSL color: ${color}`);
        return "";
    }


    const h = parseInt(values[1], 10);
    const s = parseInt(values[2], 10);
    const l = parseInt(values[3], 10);

    // Clamp the alpha value to the range [0, 1]
    a = Math.max(0, Math.min(1, a));

    // Construct and return the HSLA color string
    return `hsla(${h}, ${s}%, ${l}%, ${a})`;
};
