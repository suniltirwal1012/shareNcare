import { Link } from "react-router-dom";

const SuccessPage = () => {
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="w-full max-w-lg p-8 bg-white shadow-lg rounded-lg">
                <h1 className="text-3xl font-semibold text-center text-green-600 mb-6">
                    Success!
                </h1>
                <p className="text-lg text-gray-700 mb-6">
                    Your action was successful. You can now proceed.
                </p>
                <div className="flex justify-center">
                    <Link to="/" className="btn btn-primary">
                        Go to Home Page
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SuccessPage;
