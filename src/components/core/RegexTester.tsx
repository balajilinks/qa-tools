import React, { useState, useMemo } from 'react';
import ToolHeader from '../ToolHeader';

interface Match {
    fullMatch: string;
    groups: string[];
    index: number;
}

const RegexTester: React.FC = () => {
    const [pattern, setPattern] = useState('');
    const [flags, setFlags] = useState('g');
    const [testString, setTestString] = useState('');
    const [replacement, setReplacement] = useState('');

    const { matches, isValid, error, replacementResult } = useMemo(() => {
        if (!pattern || !testString) {
            return { matches: [], isValid: true, error: '', replacementResult: '' };
        }

        try {
            const regex = new RegExp(pattern, flags);
            const matches: Match[] = [];
            let match;

            if (flags.includes('g')) {
                while ((match = regex.exec(testString)) !== null) {
                    matches.push({
                        fullMatch: match[0],
                        groups: match.slice(1),
                        index: match.index
                    });

                    // Prevent infinite loop on zero-length matches
                    if (match[0].length === 0) {
                        regex.lastIndex++;
                    }
                }
            } else {
                match = regex.exec(testString);
                if (match) {
                    matches.push({
                        fullMatch: match[0],
                        groups: match.slice(1),
                        index: match.index
                    });
                }
            }

            const replacementResult = replacement ? testString.replace(regex, replacement) : '';

            return { matches, isValid: true, error: '', replacementResult };
        } catch (err) {
            return {
                matches: [],
                isValid: false,
                error: (err as Error).message,
                replacementResult: ''
            };
        }
    }, [pattern, flags, testString, replacement]);

    const highlightMatches = (text: string) => {
        if (!isValid || matches.length === 0) {
            return text;
        }

        let result = '';
        let lastIndex = 0;

        matches.forEach((match, i) => {
            result += text.slice(lastIndex, match.index);
            result += `<mark class="bg-yellow-300 font-semibold" title="Match ${i + 1}">${match.fullMatch}</mark>`;
            lastIndex = match.index + match.fullMatch.length;
        });

        result += text.slice(lastIndex);
        return result;
    };

    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const clearAll = () => {
        setPattern('');
        setTestString('');
        setReplacement('');
    };

    const commonPatterns = [
        { name: 'Email', pattern: '\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}\\b' },
        { name: 'URL', pattern: 'https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)' },
        { name: 'Phone (US)', pattern: '\\(\\d{3}\\)\\s?\\d{3}-\\d{4}|\\d{3}-\\d{3}-\\d{4}' },
        { name: 'IP Address', pattern: '\\b(?:[0-9]{1,3}\\.){3}[0-9]{1,3}\\b' },
        { name: 'UUID', pattern: '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}' },
        { name: 'Hex Color', pattern: '#(?:[0-9a-fA-F]{3}){1,2}\\b' },
        { name: 'Date (MM/DD/YYYY)', pattern: '\\b(0?[1-9]|1[0-2])\\/(0?[1-9]|[12][0-9]|3[01])\\/(19|20)\\d{2}\\b' }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <ToolHeader
                title="Regex Tester"
                description="Test regular expressions against sample text with real-time matching and replacement"
            />
            <div className="max-w-7xl mx-auto p-6">

                {/* Pattern Input */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Regular Expression</h2>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
                        <div className="lg:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Pattern
                            </label>
                            <input
                                type="text"
                                value={pattern}
                                onChange={(e) => setPattern(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-md font-mono focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your regex pattern..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Flags
                            </label>
                            <input
                                type="text"
                                value={flags}
                                onChange={(e) => setFlags(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-md font-mono focus:ring-2 focus:ring-blue-500"
                                placeholder="gimuy"
                            />
                        </div>
                    </div>

                    {/* Pattern Status */}
                    <div className={`p-3 rounded-md ${pattern ? (isValid ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200') : 'bg-gray-50 border border-gray-200'
                        }`}>
                        {!pattern ? (
                            <span className="text-gray-600">Enter a regex pattern to begin</span>
                        ) : isValid ? (
                            <span className="text-green-800">✓ Valid regex pattern</span>
                        ) : (
                            <span className="text-red-800">✗ Invalid regex: {error}</span>
                        )}
                    </div>

                    {/* Common Patterns */}
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Common Patterns
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {commonPatterns.map((item) => (
                                <button
                                    key={item.name}
                                    onClick={() => setPattern(item.pattern)}
                                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded text-sm hover:bg-blue-200"
                                >
                                    {item.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Test String and Results */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    {/* Test String */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-gray-900">Test String</h2>
                            <button
                                onClick={clearAll}
                                className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 text-sm"
                            >
                                Clear All
                            </button>
                        </div>

                        <textarea
                            value={testString}
                            onChange={(e) => setTestString(e.target.value)}
                            className="w-full h-64 p-3 border border-gray-300 rounded-md font-mono text-sm resize-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your test string here..."
                        />
                    </div>

                    {/* Highlighted Results */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">
                            Matches ({matches.length})
                        </h2>

                        <div className="h-64 p-3 border border-gray-300 rounded-md bg-gray-50 overflow-auto">
                            {testString ? (
                                <div
                                    className="font-mono text-sm whitespace-pre-wrap"
                                    dangerouslySetInnerHTML={{ __html: highlightMatches(testString) }}
                                />
                            ) : (
                                <div className="text-gray-500">Test string will be highlighted here...</div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Match Details */}
                {matches.length > 0 && (
                    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-gray-900">Match Details</h2>
                            <button
                                onClick={() => copyToClipboard(matches.map(m => m.fullMatch).join('\n'))}
                                className="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600 text-sm"
                            >
                                Copy All Matches
                            </button>
                        </div>

                        <div className="space-y-3 max-h-64 overflow-y-auto">
                            {matches.map((match, index) => (
                                <div key={index} className="border border-gray-200 rounded-md p-3">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                                        <div>
                                            <span className="font-medium">Match {index + 1}:</span>
                                            <code className="ml-2 bg-yellow-100 px-1 rounded">{match.fullMatch}</code>
                                        </div>
                                        <div>
                                            <span className="font-medium">Position:</span>
                                            <span className="ml-2">{match.index}</span>
                                        </div>
                                        <div>
                                            <span className="font-medium">Length:</span>
                                            <span className="ml-2">{match.fullMatch.length}</span>
                                        </div>
                                    </div>

                                    {match.groups.length > 0 && (
                                        <div className="mt-2">
                                            <span className="font-medium text-sm">Groups:</span>
                                            <div className="ml-4 space-y-1">
                                                {match.groups.map((group, groupIndex) => (
                                                    <div key={groupIndex} className="text-sm">
                                                        <span className="text-gray-600">Group {groupIndex + 1}:</span>
                                                        <code className="ml-2 bg-blue-100 px-1 rounded">{group || '(empty)'}</code>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Replacement */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Replacement</h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Replacement String
                            </label>
                            <input
                                type="text"
                                value={replacement}
                                onChange={(e) => setReplacement(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-md font-mono focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter replacement string... (use $1, $2 for groups)"
                            />
                            <div className="mt-2 text-sm text-gray-600">
                                Use $1, $2, etc. to reference capture groups
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Result
                            </label>
                            <div className="h-24 p-3 border border-gray-300 rounded-md bg-gray-50 overflow-auto">
                                {replacementResult ? (
                                    <div className="font-mono text-sm whitespace-pre-wrap">{replacementResult}</div>
                                ) : (
                                    <div className="text-gray-500">Replacement result will appear here...</div>
                                )}
                            </div>
                            {replacementResult && (
                                <button
                                    onClick={() => copyToClipboard(replacementResult)}
                                    className="mt-2 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
                                >
                                    Copy Result
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegexTester;
