"use client";
import { FC, useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";

interface CodeProps {

}

import { cn } from "@/lib/utils";
import { useSettingsContext } from "@/providers";
import { EditorView } from "@codemirror/view";
import createTheme from "@uiw/codemirror-themes";
import { hslToHsla as adjustLightness } from "@/utils";
import { tags as t } from "@lezer/highlight";
import ReactCodeMirror from "@uiw/react-codemirror";

export const Code: FC<CodeProps> = () => {
    const [selectedLanguage, setSelectedLanguage] = useState<any>(null);
    const [code, setCode] = useState<string>(`const app = next();
    const root = document.getElementById("root");
    next.init({
        root,
        app
    })

    next.render({
        hydration: true,
        srr: true,
        resumability: true,
        cache: true,
    })`);

    const { language, theme, fontStyle, lineNumbers, padding } =
        useSettingsContext();


    const onChange = useCallback((value: string) => {
        setCode(value);
    }, []);

    useEffect(() => {
        async function loadLanguage() {
            const lang = await language.extension();

            setSelectedLanguage(lang);
        }

        loadLanguage();
    }, [language]);

    const styleTheme = EditorView.baseTheme({
        "&.cm-editor": {
            fontSize: "0.9375rem",
        },
        "&.cm-editor.cm-focused": {
            outline: "none",
        },
        ".cm-gutterElement": {
            display: "flex",
            justifyContent: "flex-end",
            paddingRight: "1rem !important",
            lineHeight: "1.5rem",
            letterSpacing: ".1px",
        },
        ".cm-content": {
            lineHeight: "1.5rem",
        },
    });

    const customFontstyle = EditorView.theme({
        ".cm-content *": {
            fontFamily: fontStyle?.variable,
            fontVariantLigatures: "normal",
        },
        ".cm-gutters": {
            fontFamily: fontStyle?.variable,
            fontVariantLigatures: "normal",
        },
    });

    const c = theme.baseColors;

    const myTheme = createTheme({
        theme: "dark",
        settings: {
            background: "transparent",
            foreground: "white",
            caret: c.at(0),
            selection: adjustLightness(c.at(0)!, 0.1),
            selectionMatch: adjustLightness(c.at(1)!, 0.2),
            lineHighlight: "transparent",
            gutterBackground: "transparent",
            gutterForeground: adjustLightness(c.at(0)!, 0.4),
            gutterBorder: "transparent",
        },
        styles: [
            {
                tag: [t.emphasis],
                fontStyle: "italic",
            },
            {
                tag: [t.strong],
                fontStyle: "bold",
            },
            {
                tag: [t.link],
                color: c.at(1),
            },
            {
                tag: [t.comment, t.lineComment, t.blockComment, t.docComment],
                fontStyle: "italic",
                color: adjustLightness(c.at(0)!, 0.4),
            },
            {
                tag: [
                    t.bracket,
                    t.squareBracket,
                    t.paren,
                    t.punctuation,
                    t.angleBracket,
                ],
                color: c.at(0),
            },
            {
                tag: t.variableName,
                color: c.at(5),
                fontStyle: "italic",
            },
            { tag: t.propertyName, color: c.at(5), fontStyle: "italic" },
            { tag: t.definition(t.variableName), color: c.at(10) },
            { tag: t.definition(t.propertyName), color: c.at(8) },
            {
                tag: [
                    t.moduleKeyword,
                    t.keyword,
                    t.changed,
                    t.annotation,
                    t.modifier,
                    t.namespace,
                    t.self,
                    t.meta,
                ],
                color: c.at(1),
            },
            {
                tag: [t.typeName, t.typeOperator],
                color: c.at(13),
            },
            {
                tag: [t.operator, t.special(t.string)],
                color: c.at(6),
            },
            {
                tag: [t.number, t.bool, t.string, t.processingInstruction, t.inserted],
                color: c.at(2),
            },
            {
                tag: [
                    t.color,
                    t.className,
                    t.constant(t.name),
                    t.standard(t.name),
                    t.function(t.variableName),
                    t.function(t.propertyName),
                ],
                color: c.at(8),
            },
            {
                tag: [t.regexp],
                color: c.at(12),
            },
            {
                tag: [t.tagName],
                color: c.at(11),
            },
            {
                tag: [t.attributeValue],
                color: c.at(2),
            },
            {
                tag: [t.attributeName],
                color: c.at(6),
            },
            {
                tag: [t.heading],
                color: c.at(1),
                fontWeight: "bold",
            },
            {
                tag: [t.quote],
                color: c.at(6),
            },
        ],
    });

    return (
        <motion.div
            layout
            className={cn(
                "relative z-0 w-auto min-w-[512px] max-w-5xl",
                padding.class,
                "bg-gradient-to-br",
                "transition-all duration-200 ease-in-out"
            )}
        >
            <motion.div
                layout
                className="relative z-[1] h-full w-full min-w-[480px] max-w-2xl rounded-xl"
            >
                <div
                    className={cn(
                        "absolute inset-0 rounded-xl",
                        "after:absolute after:inset-0 after:z-[2] after:translate-y-6 after:rounded-xl after:bg-black/60 after:blur-xl"
                    )}
                >
                    <div
                        className={cn(
                            "absolute inset-0 z-[3] rounded-xl",
                            "bg-gradient-to-br"
                        )}
                    />
                </div>
                <div className="relative z-[4] rounded-xl bg-black/70 p-4">
                    {selectedLanguage && (
                        <ReactCodeMirror
                            value={code}
                            onChange={onChange}
                            extensions={[
                                selectedLanguage,
                                styleTheme,
                                customFontstyle,
                                EditorView.lineWrapping,
                            ]}
                            basicSetup={{
                                lineNumbers: lineNumbers,
                                foldGutter: false,
                                autocompletion: false,
                                indentOnInput: false,
                                highlightActiveLine: false,
                                highlightActiveLineGutter: false,
                                dropCursor: false,
                                searchKeymap: false,
                                lintKeymap: false,
                                completionKeymap: false,
                                foldKeymap: false,
                            }}
                            theme={myTheme}
                        />
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
}
