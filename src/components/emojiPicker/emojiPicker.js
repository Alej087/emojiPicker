import { forwardRef, useState, useRef, useEffect } from "react";
import { data as emojiList } from "./data";
import EmojiButton from "./emojiButton";
import EmojiSearch from "./emojiSearch";
import styles from "./emojiPicker.module.scss";

export function EmojiPicker(props, inputRef) {
    const [isOpen, setIsOpen] = useState(false);
    const [emojis, setEmojis] = useState([...emojiList]);
    const containerRef = useRef(null);

    useEffect(() => {
        window.addEventListener("click", (e) => {
            if (!containerRef.current.contains(e.target)) {
                setIsOpen(false);
                setEmojis(emojiList);
            }
        });
    }, []);

    function handleSearch(e) {
        const q = e.target.value.toLowerCase();
        if (!!q) {
            const search = emojiList.filter((emoji) => {
                return (
                    emoji.name.toLowerCase().includes(q) ||
                    emoji.keywords.toLowerCase().includes(q)
                );
            });
            setEmojis(search);
        } else {
            setEmojis(emojiList);
        }
    }

    function handleClicOpen() {
        setIsOpen(!isOpen);
    }

    // function EmojiPickerContainer() {
    //     return;
    // }

    function handleClickEmoji(emoji) {
        const cursorPos = inputRef.current.selectionStart;
        const text = inputRef.current.value;
        const prev = text.slice(0, cursorPos);
        const next = text.slice(cursorPos);

        inputRef.current.value = prev + emoji.symbol + next;
        inputRef.current.selectionStart = cursorPos + emoji.symbol.length;
        inputRef.current.selectionEnd = cursorPos + emoji.symbol.length;
        inputRef.current.focus();
    }

    return (
        <div ref={containerRef} className={styles.inputContainer}>
            <button
                onClick={handleClicOpen}
                className={styles.emojiPickerButton}
            >
                😶‍🌫️
            </button>
            {isOpen ? (
                <div className={styles.emojiPickerContainer}>
                    <EmojiSearch onSearch={handleSearch} />
                    <div className={styles.emojiList}>
                        {emojis.map((emoji) => (
                            <EmojiButton
                                key={emoji.symbol}
                                emoji={emoji}
                                onClick={handleClickEmoji}
                            />
                        ))}
                    </div>
                </div>
            ) : (
                ""
            )}
        </div>
    );
}

export default forwardRef(EmojiPicker);
