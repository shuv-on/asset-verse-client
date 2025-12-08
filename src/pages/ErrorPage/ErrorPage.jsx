import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-base-200 text-center px-4">
            <h1 className="text-9xl font-bold text-sky-200">404</h1>
            <h2 className="text-4xl font-bold text-gray-800 mt-4">Page Not Found</h2>
            <p className="text-gray-600 mt-2 max-w-md">
                Oops! The page you are looking for does not exist. It might have been moved or deleted.
            </p>
            <Link to="/" className="btn bg-sky-600 hover:bg-sky-700 text-white mt-8 px-8">
                Go Back Home
            </Link>
        </div>
    );
};

export default ErrorPage;