import styles from './Error.module.scss';

interface ErrorPageProps {
    code: number;
    message: string;
}

export default function ErrorPage({ code, message }: ErrorPageProps) {
    return (
        <div class={styles.errorPage}>
            <h1>Error {code}</h1>
            <p>{message}</p>
            <a href="/" class="button primary">Go to Home</a>
        </div>
    );
}