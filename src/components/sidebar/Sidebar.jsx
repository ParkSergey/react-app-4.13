import styles from './Sidebar.module.css'

function Sidebar() {
  return (
    <div className={styles.article}>
      <span className={styles.popular}>
        Popular Tags
     <div className={styles.tags}>
        <span>one</span>
        <span>something</span> 
        <span>chinese</span>
        <span>english</span>
        <span>french</span>
      </div></span>
      
    </div>
  )
}

export default Sidebar;