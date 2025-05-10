import ErrorPage from './Error';

export default function TooManyRequestsPage() {
    return <ErrorPage code={429} message="Too Many Requests. Please try again later." />;
}