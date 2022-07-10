import styles from './Header.module.css'
const Header = () => {
  return (
    <div>
        <div className={styles.bg}>
            <img src="./images/bg-header-desktop.svg" alt="background" />
        </div>
    </div>
  )
}

export default Header