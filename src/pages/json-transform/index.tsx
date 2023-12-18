import { BaseButton } from '@/components';
import { useTransform } from './hooks/useTransform';
import styles from './style.module.scss';

export function JsonTransform() {
  const { json, stringjson, onCopy, onReset, changeJson, changeStringjson } =
    useTransform();

  return (
    <div className={styles.box}>
      <h2>To StringJson</h2>
      <div className="content">
        <div className="json">
          <div className="json-title">Json View</div>
          <textarea
            className="json-textarea"
            value={json}
            onChange={changeJson}
          ></textarea>
        </div>
        <div className="btn">
          <BaseButton active onClick={onReset}>
            Reset
          </BaseButton>
          <BaseButton active className="btn-copy" onClick={onCopy}>
            Copy
          </BaseButton>
        </div>
        <div className="strig-json">
          <div className="strig-json-title">StringJson View</div>
          <textarea
            className="strig-json-textarea"
            value={stringjson}
            onChange={changeStringjson}
          ></textarea>
        </div>
      </div>
    </div>
  );
}
