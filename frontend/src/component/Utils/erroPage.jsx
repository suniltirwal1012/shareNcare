import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="w-full max-w-lg p-8 bg-white shadow-lg rounded-lg">
                <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
                    Oops! Something went wrong.
                </h1>
                <p className="text-lg text-gray-700 mb-6">
                    It seems there was an error processing your request. Please fill all the details correctly and try again later.
                </p>
                <div className="flex justify-center">
                    <Link to="/" className="btn btn-primary">
                        Go Back To Home Page
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;
