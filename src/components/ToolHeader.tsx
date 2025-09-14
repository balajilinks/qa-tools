import React from 'react';
import { Link } from 'react-router-dom';

interface ToolHeaderProps {
    title: string;
    description?: string;
}

const ToolHeader: React.FC<ToolHeaderProps> = ({ title, description }) => {
    return (
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link
                            to="/"
                            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Tools
                        </Link>
                    </div>

                    <div className="text-center flex-1">
                        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                        {description && (
                            <p className="text-gray-600 mt-1">{description}</p>
                        )}
                    </div>

                    <div className="w-24"> {/* Spacer for balance */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ToolHeader;
