import styles from './Home.module.scss';

export default function HomePage() {
    return (
        <div class={styles.welcome}>
            <h2>Welcome to Task Manager!</h2>
            <p>
                Manage your tasks efficiently and stay organized. Use the buttons above
                to view your task list or create a new task.
            </p>
        </div>
    );
}