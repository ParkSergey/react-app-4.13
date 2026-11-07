import styles from './Pagination.module.css';
function Pagination({ page, totalPages, onChange }) {
  const pages = Array.from({ length: totalPages },(_, i) => i + 1) 
  return (
    <div className={styles.pagination}>
      {pages.map((p) => (<button
        key={p}
        className={p === page ? styles.active : ''}
        onClick={() => onChange(p)}
      >
        {p}
        </button>
      ))}
    </div>
  );
}
export default Pagination;
