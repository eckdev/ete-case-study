import styles from '../../../styles/home.module.css'

const ProgressBar = (props) => {
    const { completed,name } = props;
    
    return (
      <div className={styles.progressBarContainer}>
        <div className={styles.filler} style={{width: `${completed}%`}}>
          <span className={styles.pbLabel}>{name}</span>
        </div>
      </div>
    );
  };
  
  export default ProgressBar;