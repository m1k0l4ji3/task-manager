import ErrorPage from './Error';

export default function ServerErrorPage() {
    return <ErrorPage code={500} message="Internal Server Error. Please try again later." />;
}