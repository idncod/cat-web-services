import styles from './DemoPage.module.scss';
import { Link } from 'react-router-dom';

const videoSrc = '/cws-demo.mp4';

export const DemoPage = () => {
    return (
        <main className={styles.page}>
            <div className={styles.shell}>
                <div className={styles.header}>
                    <Link className={styles.backLink} to="/">
                        ← Back to console
                    </Link>
                    <span className={styles.eyebrow}>CWS Demo</span>
                    <h1 className={styles.title}>Cat Web Services demo walkthrough</h1>
                    <p className={styles.subtitle}>
                        A fake premium cloud console where cats manage humans like underperforming infrastructure.
                    </p>
                </div>

                <section className={styles.videoCard}>
                    <video
                        className={styles.video}
                        src={videoSrc}
                        controls
                        playsInline
                        preload="metadata"
                    />
                </section>
            </div>
        </main>
    );
};