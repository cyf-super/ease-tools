import { Edit } from './editor';
import styles from './index.module.scss';
import { BaseButton } from '@/components';
import { useTransform } from './hooks/useTransform';

export function TextTransform() {
  const {
    editor,
    descendant,
    textHtml,
    onTransform,
    editChange,
    changeTextArea,
    onCopy,
    onReset
  } = useTransform();

  return (
    <div className={styles.box}>
      <h2>To TextHtml</h2>
      <Edit onChange={editChange} descendant={descendant} editor={editor} />
      <div className="btn">
        <BaseButton active onClick={onReset}>
          Reset
        </BaseButton>
        <BaseButton active className="btn-texthtml" onClick={onTransform}>
          To textHtml
        </BaseButton>
        <BaseButton active className="btn-copy" onClick={onCopy}>
          Copy
        </BaseButton>
      </div>

      <div className="texthtml">
        <div className="texthtml-title">Texthtml View</div>
        <textarea
          className="texthtml-textarea"
          value={textHtml}
          onChange={changeTextArea}
        ></textarea>
      </div>
      <div dangerouslySetInnerHTML={{ __html: textHtml }}></div>
    </div>
  );
}
