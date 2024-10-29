export type Choice = {
    label: string;
    class: string;
};

export type GradientBackground = {
    name: string;
    value: string;
};

import type { Extension } from "@codemirror/state";

export type ChoiceDefinition = {
    id: string;
    label: string;
    class: string;
};

export type ThemeDefinition = {
    id: string;
    label: string;
    baseColors: string[];
};

export type LanguageDefinition = {
    id: string;
    label: string;
    extension: () => Promise<Extension>;
};

export type FontDefinition = {
    id: string;
    label: string;
    variable: string;
    class: string;
};

export type Message =
    | "SUCCESS"
    | "ERROR"
    | "UNAUTHORIZED"
    | "TOO_MANY_REQUESTS"
    | "LIMIT_REACHED"
    | "EMPTY_EDITOR"
    | "UNKNOWN_ERROR"
    | "SNIPPET_NOT_FOUND"
    | "INTERNAL_SERVER_ERROR"
    | "PENDING"
    | "IDLE"
    | "CLIPBOARD_API_NOT_SUPPORTED";
