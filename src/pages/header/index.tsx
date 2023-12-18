import styles from './style.module.scss';

export function Header() {
  return (
    <div className={styles.header}>
      <img className="logo" src="/public/header/logo.svg" alt="" />
      <span className="title">Ease Tools</span>
    </div>
  );
}
