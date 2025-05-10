import ErrorPage from './Error';

export default function NotFoundPage() {
    return <ErrorPage code={404} message="Page Not Found" />;
}