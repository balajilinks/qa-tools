import React, { useState, useMemo } from 'react';
import ToolHeader from '../ToolHeader';

interface DiffResult {
    missing: string[];
    extra: string[];
    common: string[];
}

const ListDiff: React.FC = () => {
    const [list1, setList1] = useState('');
    const [list2, setList2] = useState('');
    const [separator, setSeparator] = useState('\n');
    const [caseSensitive, setCaseSensitive] = useState(true);
    const [trimWhitespace, setTrimWhitespace] = useState(true);

    const diffResult = useMemo((): DiffResult => {
        if (!list1.trim() || !list2.trim()) {
            return { missing: [], extra: [], common: [] };
        }

        const processItem = (item: string) => {
            let processed = trimWhitespace ? item.trim() : item;
            return caseSensitive ? processed : processed.toLowerCase();
        };

        const items1 = list1.split(separator).map(processItem).filter(Boolean);
        const items2 = list2.split(separator).map(processItem).filter(Boolean);

        const set1 = new Set(items1);
        const set2 = new Set(items2);

        const missing = items1.filter(item => !set2.has(item));
        const extra = items2.filter(item => !set1.has(item));
        const common = items1.filter(item => set2.has(item));

        return {
            missing: [...new Set(missing)], // Remove duplicates
            extra: [...new Set(extra)],
            common: [...new Set(common)]
        };
    }, [list1, list2, separator, caseSensitive, trimWhitespace]);

    const clearAll = () => {
        setList1('');
        setList2('');
    };

    const copyToClipboard = async (items: string[]) => {
        try {
            await navigator.clipboard.writeText(items.join('\n'));
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const getSeparatorOptions = () => [
        { value: '\n', label: 'New Line' },
        { value: ',', label: 'Comma' },
        { value: ';', label: 'Semicolon' },
        { value: '|', label: 'Pipe' },
        { value: '\t', label: 'Tab' },
        { value: ' ', label: 'Space' }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <ToolHeader
                title="List Diff Tool"
                description="Compare two lists and identify missing, extra, and common elements"
            />
            <div className="max-w-7xl mx-auto p-6">

                {/* Configuration */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Configuration</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Separator
                            </label>
                            <select
                                value={separator}
                                onChange={(e) => setSeparator(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                            >
                                {getSeparatorOptions().map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="caseSensitive"
                                checked={caseSensitive}
                                onChange={(e) => setCaseSensitive(e.target.checked)}
                                className="mr-2"
                            />
                            <label htmlFor="caseSensitive" className="text-sm font-medium text-gray-700">
                                Case Sensitive
                            </label>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="trimWhitespace"
                                checked={trimWhitespace}
                                onChange={(e) => setTrimWhitespace(e.target.checked)}
                                className="mr-2"
                            />
                            <label htmlFor="trimWhitespace" className="text-sm font-medium text-gray-700">
                                Trim Whitespace
                            </label>
                        </div>
                        <div className="flex items-end">
                            <button
                                onClick={clearAll}
                                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                            >
                                Clear All
                            </button>
                        </div>
                    </div>
                </div>

                {/* Input Lists */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">List 1 (Reference)</h2>
                        <textarea
                            value={list1}
                            onChange={(e) => setList1(e.target.value)}
                            className="w-full h-64 p-3 border border-gray-300 rounded-md font-mono text-sm resize-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your first list here..."
                        />
                        <div className="mt-2 text-sm text-gray-600">
                            Items: {list1.split(separator).filter(Boolean).length}
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">List 2 (Compare)</h2>
                        <textarea
                            value={list2}
                            onChange={(e) => setList2(e.target.value)}
                            className="w-full h-64 p-3 border border-gray-300 rounded-md font-mono text-sm resize-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your second list here..."
                        />
                        <div className="mt-2 text-sm text-gray-600">
                            Items: {list2.split(separator).filter(Boolean).length}
                        </div>
                    </div>
                </div>

                {/* Results */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Missing Items */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-red-600">
                                Missing in List 2 ({diffResult.missing.length})
                            </h3>
                            <button
                                onClick={() => copyToClipboard(diffResult.missing)}
                                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                                disabled={diffResult.missing.length === 0}
                            >
                                Copy
                            </button>
                        </div>
                        <div className="max-h-64 overflow-y-auto border border-gray-200 rounded-md">
                            {diffResult.missing.length === 0 ? (
                                <div className="p-3 text-gray-500 text-center">No missing items</div>
                            ) : (
                                <ul className="divide-y divide-gray-200">
                                    {diffResult.missing.map((item, index) => (
                                        <li key={index} className="p-3 text-sm font-mono bg-red-50">
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>

                    {/* Extra Items */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-orange-600">
                                Extra in List 2 ({diffResult.extra.length})
                            </h3>
                            <button
                                onClick={() => copyToClipboard(diffResult.extra)}
                                className="px-3 py-1 bg-orange-500 text-white rounded hover:bg-orange-600 text-sm"
                                disabled={diffResult.extra.length === 0}
                            >
                                Copy
                            </button>
                        </div>
                        <div className="max-h-64 overflow-y-auto border border-gray-200 rounded-md">
                            {diffResult.extra.length === 0 ? (
                                <div className="p-3 text-gray-500 text-center">No extra items</div>
                            ) : (
                                <ul className="divide-y divide-gray-200">
                                    {diffResult.extra.map((item, index) => (
                                        <li key={index} className="p-3 text-sm font-mono bg-orange-50">
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>

                    {/* Common Items */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-green-600">
                                Common Items ({diffResult.common.length})
                            </h3>
                            <button
                                onClick={() => copyToClipboard(diffResult.common)}
                                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
                                disabled={diffResult.common.length === 0}
                            >
                                Copy
                            </button>
                        </div>
                        <div className="max-h-64 overflow-y-auto border border-gray-200 rounded-md">
                            {diffResult.common.length === 0 ? (
                                <div className="p-3 text-gray-500 text-center">No common items</div>
                            ) : (
                                <ul className="divide-y divide-gray-200">
                                    {diffResult.common.map((item, index) => (
                                        <li key={index} className="p-3 text-sm font-mono bg-green-50">
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>

                {/* Summary */}
                <div className="mt-6 bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Summary</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        <div className="p-4 bg-red-50 rounded-lg">
                            <div className="text-2xl font-bold text-red-600">{diffResult.missing.length}</div>
                            <div className="text-sm text-red-700">Missing</div>
                        </div>
                        <div className="p-4 bg-orange-50 rounded-lg">
                            <div className="text-2xl font-bold text-orange-600">{diffResult.extra.length}</div>
                            <div className="text-sm text-orange-700">Extra</div>
                        </div>
                        <div className="p-4 bg-green-50 rounded-lg">
                            <div className="text-2xl font-bold text-green-600">{diffResult.common.length}</div>
                            <div className="text-sm text-green-700">Common</div>
                        </div>
                        <div className="p-4 bg-blue-50 rounded-lg">
                            <div className="text-2xl font-bold text-blue-600">
                                {diffResult.missing.length + diffResult.extra.length + diffResult.common.length}
                            </div>
                            <div className="text-sm text-blue-700">Total Unique</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListDiff;
