import EmojiPicker from "./emojiPicker";
import { useRef } from "react";
import styles from "./emojiPicker.module.scss";

export default function EmojiPickerInput() {
    const refInput = useRef(null);

    return (
        <div>
            <input className={styles.input} ref={refInput} />
            <EmojiPicker ref={refInput} />
        </div>
    );
}
