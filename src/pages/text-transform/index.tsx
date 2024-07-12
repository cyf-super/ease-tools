import { Edit } from './editor';
import styles from './index.module.scss';
import { BaseButton } from '@/components';
import { useTransform } from './hooks/useTransform';

export function TextTransform() {
  const {
    editor,
    isTitle,
    descendant,
    textHtmlList,
    onTransform,
    editChange,
    changeCheckBox,
    onCopy,
    onReset
  } = useTransform();

  const disabled = !descendant[0]?.children[0].text;

  const textHtml = textHtmlList.reduce((html, item) => {
    return (html += item?.detail), html;
  }, '');

  return (
    <>
      <div className={styles.box}>
        <h2>To TextHtml</h2>
        <div className="content">
          <div className="left">
            <Edit
              onChange={editChange}
              descendant={descendant}
              editor={editor}
            />
            <div className="btn">
              <BaseButton disabled={disabled} onClick={onReset}>
                Reset
              </BaseButton>
              <BaseButton
                disabled={disabled}
                className="btn-texthtml"
                onClick={onTransform}
              >
                To textHtml
              </BaseButton>
              <BaseButton
                disabled={!textHtml}
                className="btn-copy"
                onClick={() => onCopy(textHtml)}
              >
                Copy
              </BaseButton>
            </div>
          </div>
          <div className="right">
            <input
              type="checkbox"
              id="checkbox"
              checked={isTitle}
              onChange={changeCheckBox}
            />
            <label htmlFor="checkbox">第一行是否为标题</label>
          </div>
        </div>

        <div className="texthtml">
          {textHtmlList.map(item => (
            <div>
              <div
                className="texthtml-title"
                onClick={() => onCopy(item.title)}
              >
                {item.title || 'Texthtml View'}
              </div>
              <div className="texthtml-content">
                <div
                  onClick={() => onCopy(item.detail)}
                  className="texthtml-textarea"
                >
                  {item.detail}
                </div>
                <BaseButton
                  disabled={!item.detail}
                  className="btn-small"
                  onClick={() => onCopy(item.detail)}
                >
                  Copy
                </BaseButton>
              </div>
            </div>
          ))}
        </div>

        {textHtmlList.length ? <h3>预览</h3> : null}
        {textHtmlList.map(item => (
          <div className="innerHTML">
            <div>{item.title}</div>
            <div dangerouslySetInnerHTML={{ __html: item.detail }}></div>
          </div>
        ))}
      </div>
    </>
  );
}
