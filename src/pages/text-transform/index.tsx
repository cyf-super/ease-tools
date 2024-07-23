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
    title,
    onTransform,
    editChange,
    changeCheckBox,
    onCopy,
    onReset,
    onDownload,
    setTtile
  } = useTransform();

  const disabled = !descendant[0]?.children[0].text;

  const textHtml = textHtmlList.reduce((html, item) => {
    return (html += item?.detail), html;
  }, '');

  console.log('textHtmlList ', textHtmlList);

  return (
    <>
      <div className={styles.box}>
        <h2>To TextHtml</h2>
        <div className="titleInput">
          <input
            className="input"
            placeholder="请输入文档标题～"
            type="text"
            value={title}
            onChange={e => setTtile(e.target.value)}
          />
          <span className="delIcon" onClick={() => setTtile('')}></span>
        </div>
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
                // className="btn-texthtml"
                onClick={onDownload}
              >
                下载 json
              </BaseButton>
            </div>
          </div>
          <div className="right">
            <div className="option">
              <input
                type="checkbox"
                id="checkbox"
                checked={isTitle}
                onChange={changeCheckBox}
              />
              <label htmlFor="checkbox">第一行是否为标题</label>
            </div>

            <div className="handleBtn"></div>
          </div>
        </div>

        <div className="texthtml">
          {textHtmlList.map((item, index) => (
            <div key={index}>
              <div className="texthtml-title" onClick={() => onCopy(item.name)}>
                {item.name || 'Texthtml View'}
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
            <div>{item.name}</div>
            <div dangerouslySetInnerHTML={{ __html: item.detail }}></div>
          </div>
        ))}
      </div>
    </>
  );
}
