import React, { useState } from 'react';
import ToolHeader from '../ToolHeader';

const JsonFormatter: React.FC = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [error, setError] = useState('');
    const [isValid, setIsValid] = useState<boolean | null>(null);

    const formatJson = (minify = false) => {
        try {
            const parsed = JSON.parse(input);
            const formatted = minify
                ? JSON.stringify(parsed)
                : JSON.stringify(parsed, null, 2);
            setOutput(formatted);
            setError('');
            setIsValid(true);
        } catch (err) {
            setError(`Invalid JSON: ${(err as Error).message}`);
            setIsValid(false);
            setOutput('');
        }
    };

    const validateJson = () => {
        try {
            JSON.parse(input);
            setIsValid(true);
            setError('');
        } catch (err) {
            setIsValid(false);
            setError(`Invalid JSON: ${(err as Error).message}`);
        }
    };

    const clearAll = () => {
        setInput('');
        setOutput('');
        setError('');
        setIsValid(null);
    };

    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <ToolHeader
                title="JSON Formatter & Validator"
                description="Beautify, minify, and validate JSON data with syntax highlighting and error detection"
            />
            <div className="max-w-7xl mx-auto p-6">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Input Section */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-gray-900">Input JSON</h2>
                            <div className="flex gap-2">
                                <button
                                    onClick={validateJson}
                                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                                >
                                    Validate
                                </button>
                                <button
                                    onClick={clearAll}
                                    className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 text-sm"
                                >
                                    Clear
                                </button>
                            </div>
                        </div>

                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="w-full h-96 p-3 border border-gray-300 rounded-md font-mono text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Paste your JSON here..."
                        />

                        {/* Validation Status */}
                        {isValid !== null && (
                            <div className={`mt-3 p-3 rounded-md ${isValid
                                ? 'bg-green-50 border border-green-200 text-green-800'
                                : 'bg-red-50 border border-red-200 text-red-800'
                                }`}>
                                {isValid ? (
                                    <div className="flex items-center">
                                        <span className="text-green-600 mr-2">✓</span>
                                        Valid JSON
                                    </div>
                                ) : (
                                    <div className="flex items-start">
                                        <span className="text-red-600 mr-2">✗</span>
                                        <div>
                                            <div className="font-medium">Invalid JSON</div>
                                            <div className="text-sm mt-1">{error}</div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Output Section */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-gray-900">Formatted JSON</h2>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => formatJson(false)}
                                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
                                    disabled={!input.trim()}
                                >
                                    Beautify
                                </button>
                                <button
                                    onClick={() => formatJson(true)}
                                    className="px-3 py-1 bg-orange-500 text-white rounded hover:bg-orange-600 text-sm"
                                    disabled={!input.trim()}
                                >
                                    Minify
                                </button>
                                <button
                                    onClick={() => copyToClipboard(output)}
                                    className="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600 text-sm"
                                    disabled={!output}
                                >
                                    Copy
                                </button>
                            </div>
                        </div>

                        <textarea
                            value={output}
                            readOnly
                            className="w-full h-96 p-3 border border-gray-300 rounded-md font-mono text-sm resize-none bg-gray-50"
                            placeholder="Formatted JSON will appear here..."
                        />
                    </div>
                </div>

                {/* Features */}
                <div className="mt-8 bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Features</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <div>
                                <div className="font-medium">JSON Validation</div>
                                <div className="text-sm text-gray-600">Real-time syntax validation with error messages</div>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <div>
                                <div className="font-medium">Beautify & Minify</div>
                                <div className="text-sm text-gray-600">Format JSON for readability or compress for production</div>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <div>
                                <div className="font-medium">Copy to Clipboard</div>
                                <div className="text-sm text-gray-600">Easy copying of formatted results</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JsonFormatter;
