import styles from './Sidebar.module.css'

function Sidebar() {
  return (
    <div className={styles.article}>
      <span className={styles.popular}>
        Popular Tags
     </span>
      <div className={styles.tags}>
        <span>one</span>
        <span>something</span> 
        <span>chinese</span>
        <span>english</span>
        <span>french</span>
      </div>
    </div>
  )
}

export default Sidebar;