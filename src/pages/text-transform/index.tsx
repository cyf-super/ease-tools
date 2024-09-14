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
    regular,
    headerInputRef,
    regularNum,
    regularError,
    onChangeRegular,
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

  console.log('textHtmlList ', descendant);

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
            ref={headerInputRef}
          />
          <span
            className="delIcon"
            onClick={() => {
              setTtile('');
              headerInputRef.current?.focus();
            }}
          ></span>
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
              <BaseButton disabled={!textHtml} onClick={onDownload}>
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

            <div className="regularHandle">
              <p>正则清除</p>
              <div className="regularInput">
                <label className="regularLabel" form="regularLabel">
                  正则表达式
                </label>
                <input
                  type="text"
                  id="regularLabel"
                  placeholder="正则表达式"
                  value={regular}
                  onChange={e => onChangeRegular(e.target.value)}
                />
                <span
                  className={['error', regularError ? 'showErorr' : ''].join(
                    ' '
                  )}
                >
                  非法的正则
                </span>
              </div>
              <div className="">
                <span className="size">匹配数量：{regularNum}</span>
              </div>
              <button className="clearBtn">清除</button>
            </div>
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
