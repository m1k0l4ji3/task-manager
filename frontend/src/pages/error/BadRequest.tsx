import ErrorPage from './Error';

export default function BadRequestPage() {
    return <ErrorPage code={400} message="Bad Request. Please check your input." />;
}