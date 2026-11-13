import styles from './Tags.module.css';

function Tags({ tagList, compact = false }) {
  const tags = tagList.length ? tagList : Array(9).fill('tag');

  return (
    <div className={`${styles.tags} ${compact ? styles.compact : ''}`}>
      {tags.map((tag, i) => (
        <span key={i}>{tag}</span>
      ))}
    </div>
  );
}

export default Tags;