import styles from './scrollIndicator.module.css';

export default function ScrollIndicator({ label = 'Scroll', color = 'currentColor' }) {
    return (
        <div className={styles.scrollIndicator} aria-hidden="true">
            {label && <span className={styles.label}>{label}</span>}
            <span className={styles.wave}>
                <svg className={styles.chevron} width="20" height="10" viewBox="0 0 20 10" fill="none" xmlns="http://www.w3.org/2000/svg"
                    color={color}>
                    <path d="M1 1L10 9L19 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <svg className={`${styles.chevron} ${styles.chevron2}`} width="20" height="10" viewBox="0 0 20 10" fill="none" xmlns="http://www.w3.org/2000/svg"
                    color={color}>
                    <path d="M1 1L10 9L19 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <svg className={`${styles.chevron} ${styles.chevron3}`} width="20" height="10" viewBox="0 0 20 10" fill="none" xmlns="http://www.w3.org/2000/svg"
                    color={color}>
                    <path d="M1 1L10 9L19 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </span>
        </div>
    );
}

