"use client";

import { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import { Button } from "./ui/button";

export default function Editor() {
    const [isMounted, setIsMounted] = useState(false);
    const ref = useRef<EditorJS>();
    const initializeEditor = async () => {
        const EditorJS = (await import("@editorjs/editorjs")).default;
        // @ts-ignore
        const Header = (await import("@editorjs/header")).default;
        // @ts-ignore
        const Table = (await import("@editorjs/table")).default;
        // @ts-ignore
        const Raw = (await import("@editorjs/raw")).default;
        // @ts-ignore
        const LinkTool = (await import("@editorjs/link")).default;
        // @ts-ignore
        const ImageTool = (await import("@editorjs/image")).default;
        // @ts-ignore
        const SimpleImage = (await import("@editorjs/simple-image")).default;
        // @ts-ignore
        const Checklist = (await import("@editorjs/checklist")).default;
        // @ts-ignore
        const List = (await import("@editorjs/list")).default;
        // @ts-ignore
        const Embed = (await import("@editorjs/embed")).default;
        // @ts-ignore
        const Quote = (await import("@editorjs/quote")).default;
        // @ts-ignore
        const NestedList = (await import("@editorjs/nested-list")).default;
        // @ts-ignore
        const Paragraph = (await import("@editorjs/paragraph")).default;

        if (!ref.current) {
            const editor = new EditorJS({
                holder: "editorjs",
                autofocus: true,
                placeholder: 'Let`s write an awesome story!',
                tools: {
                    header: {
                        // @ts-ignore
                        class: Header,
                        config: {
                            placeholder: 'Enter a header',
                            levels: [1, 2, 3, 4],
                            defaultLevel: 2,
                        }
                    },
                    table: Table,
                    linkTool: {
                        class: LinkTool,
                        config: {
                            endpoint: 'http://localhost:8008/fetchUrl', // Your backend endpoint for url data fetching,
                        }
                    },
                    paragraph: {
                        class: Paragraph,
                        inlineToolbar: true,
                    },
                    raw: Raw,
                    checklist: {
                        class: Checklist,
                        inlineToolbar: true,
                    },
                    embed: {
                        class: Embed,
                        config: {
                            services: {
                                youtube: true,
                                coub: true
                            }
                        }
                    },
                    image: SimpleImage,
                    quote: {
                        class: Quote,
                        inlineToolbar: true,
                        shortcut: 'CMD+SHIFT+O',
                        config: {
                            quotePlaceholder: 'Enter a quote',
                            captionPlaceholder: 'Quote\'s author',
                        },
                    },
                    list: {
                        class: NestedList,
                        inlineToolbar: true,
                        config: {
                            defaultStyle: 'unordered'
                        },
                    },
                },
            });
            ref.current = editor;
        }
    };

    useEffect(() => {
        if (typeof window !== "undefined") {
            setIsMounted(true);
        }
    }, []);

    useEffect(() => {
        const init = async () => {
            await initializeEditor();
        };
        if (isMounted) {
            init();

            return () => {
                if (ref.current) {
                    ref.current.destroy();
                }
            };
        }
    }, [isMounted]);

    const save = () => {
        if (ref.current) {
            ref.current.save().then((outputData) => {
                console.log("Article data: ", outputData);
            });
        }
    };

    return (
        <div className="container">
            <div id="editorjs" className="prose lg:prose-base xl:prose-lg max-w-full min-h-[90vh]"></div>
            <Button onClick={save} className="w-full">Save</Button>
        </div>
    );
}