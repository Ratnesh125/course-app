import React from 'react';
import { useLocation } from 'react-router-dom';

function CancelPage() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const sessionId = searchParams.get('session_id');

    return (
        <div className="bg-gray-100 h-screen">
            <div className="bg-white p-6 md:mx-auto">
                <svg viewBox="0 0 24 24" className="text-red-600 w-16 h-16 mx-auto my-6">
                    <path fill="currentColor"
                        d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm1 17h-2v-2h2v2zm0-4h-2V7h2v6z" />
                </svg>
                <div className="text-center">
                    <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">Payment Failed</h3>
                    <p className="text-gray-600 my-2">Unfortunately, your payment could not be processed.</p>
                    <p>Please try again or contact support if the issue persists.</p>
                    <div className="py-10 text-center">
                        <a href="/" className="px-12 bg-red-600 hover:bg-red-500 text-white font-semibold py-3">
                            GO BACK
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CancelPage;
