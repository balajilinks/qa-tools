import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation: React.FC = () => {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navItems = [
        {
            title: 'Core QA Tools',
            items: [
                { name: 'List Diff Tool', path: '/list-diff' },
                { name: 'JSON Formatter', path: '/json-formatter' },
                { name: 'Regex Tester', path: '/regex-tester' },
                { name: 'Text Comparator', path: '/text-comparator' },
                { name: 'UUID Generator', path: '/uuid-generator' },
                { name: 'Base64 Encoder', path: '/base64' },
                { name: 'JWT Decoder', path: '/jwt-decoder' },
                { name: 'Curl Converter', path: '/curl-converter' }
            ]
        },
        {
            title: 'API & Data Tools',
            items: [
                { name: 'API Response Formatter', path: '/api-formatter' },
                { name: 'CSV/Excel Tools', path: '/csv-tools' },
                { name: 'Mock Data Generator', path: '/mock-data' },
                { name: 'Timestamp Converter', path: '/timestamp' },
                { name: 'String Utilities', path: '/string-utils' }
            ]
        },
        {
            title: 'Security & Testing',
            items: [
                { name: 'Password Generator', path: '/password-generator' },
                { name: 'Hash Generator', path: '/hash-generator' },
                { name: 'XPath/CSS Tester', path: '/xpath-tester' }
            ]
        }
    ];

    return (
        <nav className="bg-blue-600 text-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <Link to="/" className="text-xl font-bold">
                        QA Tools Suite
                    </Link>

                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>

                <div className={`${isMenuOpen ? 'block' : 'hidden'} md:block pb-4`}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {navItems.map((section) => (
                            <div key={section.title} className="mb-4">
                                <h3 className="font-semibold text-blue-200 mb-2">{section.title}</h3>
                                <ul className="space-y-1">
                                    {section.items.map((item) => (
                                        <li key={item.path}>
                                            <Link
                                                to={item.path}
                                                className={`block px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors ${location.pathname === item.path ? 'bg-blue-700' : ''
                                                    }`}
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
