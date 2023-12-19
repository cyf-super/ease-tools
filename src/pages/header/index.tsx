import styles from './style.module.scss';

const url = new URL('/header/logo.svg', import.meta.url).href;

export function Header() {
  return (
    <div className={styles.header}>
      <img className="logo" src={url} alt="" />
      <span className="title">Ease Tools</span>
    </div>
  );
}
