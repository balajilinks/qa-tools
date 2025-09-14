import React, { useState } from 'react';

const Home: React.FC = () => {
    const [activeSection, setActiveSection] = useState<string | null>(null);

    const tools = [
        {
            id: 'json-formatter',
            name: 'JSON Formatter',
            description: 'Beautify, validate, and format JSON data',
            category: 'Core QA Tools',
            component: <JsonFormatterTool />
        },
        {
            id: 'json-diff',
            name: 'JSON Diff Tool',
            description: 'Compare two JSON objects and highlight differences',
            category: 'Core QA Tools',
            component: <JsonDiffTool />
        },
        {
            id: 'jsonpath-tester',
            name: 'JSONPath Tester',
            description: 'Test JSONPath expressions against JSON data',
            category: 'Core QA Tools',
            component: <JsonPathTesterTool />
        },
        {
            id: 'list-diff',
            name: 'List Diff Tool',
            description: 'Compare two lists and highlight differences',
            category: 'Core QA Tools',
            component: <ListDiffTool />
        },
        {
            id: 'uuid-generator',
            name: 'UUID Generator',
            description: 'Generate and validate UUIDs',
            category: 'Core QA Tools',
            component: <UuidGeneratorTool />
        },
        {
            id: 'base64-encoder',
            name: 'Base64 Encoder/Decoder',
            description: 'Encode and decode Base64 strings',
            category: 'Core QA Tools',
            component: <Base64Tool />
        },
        {
            id: 'text-comparator',
            name: 'Text Comparator',
            description: 'Compare text blocks with diff highlighting',
            category: 'Core QA Tools',
            component: <TextComparatorTool />
        },
        {
            id: 'hash-generator',
            name: 'Hash Generator',
            description: 'Generate MD5, SHA1, SHA256 hashes',
            category: 'Security Tools',
            component: <HashGeneratorTool />
        },
        {
            id: 'password-generator',
            name: 'Password Generator',
            description: 'Generate secure passwords',
            category: 'Security Tools',
            component: <PasswordGeneratorTool />
        }
    ];

    const categories = [...new Set(tools.map(tool => tool.category))];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* When no tool is active, show full home page */}
            {!activeSection && (
                <div className="max-w-7xl mx-auto px-4 py-8">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            QA Tools Suite
                        </h1>
                        <p className="text-xl text-gray-600 mb-8">
                            A comprehensive collection of quality assurance and testing tools
                        </p>
                        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 max-w-2xl mx-auto">
                            <p className="text-blue-700">
                                <strong>Client-Side Processing:</strong> All tools run entirely in your browser for maximum privacy and security.
                                No data is sent to any servers.
                            </p>
                        </div>
                    </div>

                    {/* Tool Categories */}
                    {categories.map(category => (
                        <div key={category} className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                                {category}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {tools
                                    .filter(tool => tool.category === category)
                                    .map(tool => (
                                        <div
                                            key={tool.id}
                                            className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow"
                                            onClick={() => setActiveSection(tool.id)}
                                        >
                                            <h3 className="font-medium text-gray-900 mb-2">{tool.name}</h3>
                                            <p className="text-sm text-gray-600 mb-3">{tool.description}</p>
                                            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                                Open Tool
                                            </button>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* When a tool is active, show only the tool in full screen */}
            {activeSection && (
                <div className="min-h-screen">
                    {/* Compact header for active tool */}
                    <div className="bg-white shadow-sm border-b border-gray-200 px-4 py-3">
                        <div className="max-w-7xl mx-auto flex justify-between items-center">
                            <div className="flex items-center space-x-4">
                                <button
                                    onClick={() => setActiveSection(null)}
                                    className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                                >
                                    <span className="text-lg">←</span>
                                    <span>Back to Tools</span>
                                </button>
                                <div className="h-6 w-px bg-gray-300"></div>
                                <h1 className="text-xl font-semibold text-gray-900">
                                    {tools.find(tool => tool.id === activeSection)?.name}
                                </h1>
                            </div>
                            <button
                                onClick={() => setActiveSection(null)}
                                className="text-gray-500 hover:text-gray-700 text-xl"
                            >
                                ✕
                            </button>
                        </div>
                    </div>

                    {/* Tool content in full screen */}
                    <div className="max-w-7xl mx-auto px-4 py-6">
                        <div className="bg-white rounded-lg shadow-lg p-6 min-h-[calc(100vh-120px)]">
                            {tools
                                .filter(tool => tool.id === activeSection)
                                .map(tool => (
                                    <div key={tool.id}>
                                        {tool.component}
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// Individual Tool Components
const JsonFormatterTool = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [error, setError] = useState('');

    const formatJson = (minify = false) => {
        try {
            const parsed = JSON.parse(input);
            setOutput(JSON.stringify(parsed, null, minify ? 0 : 2));
            setError('');
        } catch (err) {
            setError('Invalid JSON: ' + (err as Error).message);
            setOutput('');
        }
    };

    return (
        <div className="h-full space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
                <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Input JSON:
                    </label>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="w-full h-80 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                        placeholder="Paste your JSON here..."
                    />
                    <div className="flex gap-2">
                        <button
                            onClick={() => formatJson(false)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            Format
                        </button>
                        <button
                            onClick={() => formatJson(true)}
                            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                        >
                            Minify
                        </button>
                        <button
                            onClick={() => { setInput(''); setOutput(''); setError(''); }}
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                        >
                            Clear
                        </button>
                    </div>
                </div>

                <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Formatted JSON:
                    </label>
                    {error ? (
                        <div className="h-80 p-3 bg-red-50 border border-red-200 rounded-md overflow-auto">
                            <p className="text-red-700 font-mono text-sm">{error}</p>
                        </div>
                    ) : (
                        <textarea
                            value={output}
                            readOnly
                            className="w-full h-80 p-3 border border-gray-300 rounded-md bg-gray-50 font-mono text-sm"
                            placeholder="Formatted JSON will appear here..."
                        />
                    )}
                    {output && (
                        <button
                            onClick={() => navigator.clipboard.writeText(output)}
                            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                        >
                            Copy to Clipboard
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

const UuidGeneratorTool = () => {
    const [uuids, setUuids] = useState<string[]>([]);
    const [version, setVersion] = useState<'v4' | 'v1' | 'v7'>('v4');
    const [count, setCount] = useState(1);
    const [format, setFormat] = useState<'standard' | 'uppercase' | 'braces' | 'noHyphens'>('standard');

    // Generate UUID v4 (random)
    const generateUuidV4 = (): string => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };

    // Generate UUID v1 (timestamp-based, simplified)
    const generateUuidV1 = (): string => {
        const timestamp = Date.now();
        const randomBytes = Array.from({ length: 6 }, () => Math.floor(Math.random() * 256));

        const timestampHex = timestamp.toString(16).padStart(12, '0');
        const randomHex = randomBytes.map(b => b.toString(16).padStart(2, '0')).join('');

        return `${timestampHex.slice(0, 8)}-${timestampHex.slice(8)}-1xxx-yxxx-${randomHex}`.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };

    // Generate UUID v7 (timestamp-ordered, simplified)
    const generateUuidV7 = (): string => {
        const timestamp = BigInt(Date.now());
        const randomA = Math.floor(Math.random() * 4096);
        const randomB = BigInt(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER));

        const timestampHex = timestamp.toString(16).padStart(12, '0');
        const randomAHex = randomA.toString(16).padStart(3, '0');
        const randomBHex = randomB.toString(16).padStart(15, '0');

        return `${timestampHex.slice(0, 8)}-${timestampHex.slice(8)}-7${randomAHex}-${randomBHex.slice(0, 4)}-${randomBHex.slice(4, 16)}`;
    };

    const generateUuid = (selectedVersion: string = version): string => {
        switch (selectedVersion) {
            case 'v1':
                return generateUuidV1();
            case 'v7':
                return generateUuidV7();
            default:
                return generateUuidV4();
        }
    };

    const formatUuid = (uuid: string): string => {
        switch (format) {
            case 'uppercase':
                return uuid.toUpperCase();
            case 'braces':
                return `{${uuid}}`;
            case 'noHyphens':
                return uuid.replace(/-/g, '');
            default:
                return uuid;
        }
    };

    const generateUuids = async () => {
        const newUuids: string[] = [];

        for (let i = 0; i < count; i++) {
            let uuid: string;

            uuid = generateUuid(version);

            newUuids.push(formatUuid(uuid));
        }

        setUuids(newUuids);
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    const copyAllUuids = () => {
        const allUuids = uuids.join('\n');
        navigator.clipboard.writeText(allUuids);
    };

    const clearAll = () => {
        setUuids([]);
    };

    return (
        <div className="h-full space-y-6">
            {/* Configuration Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">UUID Configuration</h3>

                    {/* UUID Version */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            UUID Version:
                        </label>
                        <div className="space-y-2">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    checked={version === 'v4'}
                                    onChange={() => setVersion('v4')}
                                    className="mr-2"
                                />
                                <span className="font-mono text-sm">v4</span>
                                <span className="ml-2 text-sm text-gray-600">Random (most common)</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    checked={version === 'v1'}
                                    onChange={() => setVersion('v1')}
                                    className="mr-2"
                                />
                                <span className="font-mono text-sm">v1</span>
                                <span className="ml-2 text-sm text-gray-600">Timestamp-based</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    checked={version === 'v7'}
                                    onChange={() => setVersion('v7')}
                                    className="mr-2"
                                />
                                <span className="font-mono text-sm">v7</span>
                                <span className="ml-2 text-sm text-gray-600">Timestamp-ordered (newest)</span>
                            </label>
                        </div>
                    </div>

                    {/* Count */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Number of UUIDs: {count}
                        </label>
                        <input
                            type="range"
                            min="1"
                            max="100"
                            value={count}
                            onChange={(e) => setCount(Number(e.target.value))}
                            className="w-full"
                        />
                        <div className="flex justify-between text-xs text-gray-500">
                            <span>1</span>
                            <span>100</span>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Output Format</h3>

                    {/* Format Options */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Format:
                        </label>
                        <div className="space-y-2">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    checked={format === 'standard'}
                                    onChange={() => setFormat('standard')}
                                    className="mr-2"
                                />
                                <span className="font-mono text-sm">standard</span>
                                <span className="ml-2 text-xs text-gray-600">123e4567-e89b-12d3-a456-426614174000</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    checked={format === 'uppercase'}
                                    onChange={() => setFormat('uppercase')}
                                    className="mr-2"
                                />
                                <span className="font-mono text-sm">UPPERCASE</span>
                                <span className="ml-2 text-xs text-gray-600">123E4567-E89B-12D3-A456-426614174000</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    checked={format === 'braces'}
                                    onChange={() => setFormat('braces')}
                                    className="mr-2"
                                />
                                <span className="font-mono text-sm">braces</span>
                                <span className="ml-2 text-xs text-gray-600">{"{123e4567-e89b-12d3-a456-426614174000}"}</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    checked={format === 'noHyphens'}
                                    onChange={() => setFormat('noHyphens')}
                                    className="mr-2"
                                />
                                <span className="font-mono text-sm">no hyphens</span>
                                <span className="ml-2 text-xs text-gray-600">123e4567e89b12d3a456426614174000</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center">
                <button
                    onClick={generateUuids}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    Generate {count > 1 ? `${count} UUIDs` : 'UUID'}
                </button>
                {uuids.length > 0 && (
                    <>
                        <button
                            onClick={copyAllUuids}
                            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                        >
                            Copy All
                        </button>
                        <button
                            onClick={clearAll}
                            className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                        >
                            Clear
                        </button>
                    </>
                )}
            </div>

            {/* Results */}
            {uuids.length > 0 && (
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                        Generated UUIDs ({uuids.length})
                    </h3>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 max-h-96 overflow-y-auto">
                        <div className="space-y-2">
                            {uuids.map((uuid, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between bg-white border rounded p-3 hover:bg-gray-50"
                                >
                                    <span className="font-mono text-sm text-gray-800 flex-1">
                                        {uuid}
                                    </span>
                                    <button
                                        onClick={() => copyToClipboard(uuid)}
                                        className="ml-2 px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                                    >
                                        Copy
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* UUID Info */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="font-medium text-blue-900 mb-2">UUID Information</h4>
                        <div className="text-sm text-blue-800 space-y-1">
                            <p><strong>Version:</strong> {version.toUpperCase()} - {
                                version === 'v4' ? 'Random UUID (122 bits of randomness)' :
                                    version === 'v1' ? 'Timestamp-based UUID (includes MAC address)' :
                                        'Timestamp-ordered UUID (sortable by creation time)'
                            }</p>
                            <p><strong>Format:</strong> {format} - {
                                format === 'standard' ? 'Standard RFC 4122 format' :
                                    format === 'uppercase' ? 'Uppercase hexadecimal' :
                                        format === 'braces' ? 'Microsoft GUID format' :
                                            'Compact format without hyphens'
                            }</p>
                            <p><strong>Length:</strong> {
                                format === 'braces' ? '38 characters' :
                                    format === 'noHyphens' ? '32 characters' :
                                        '36 characters'
                            }</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const Base64Tool = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [mode, setMode] = useState<'encode' | 'decode'>('encode');

    const process = () => {
        try {
            if (mode === 'encode') {
                setOutput(btoa(input));
            } else {
                setOutput(atob(input));
            }
        } catch (err) {
            setOutput('Error: Invalid input for ' + mode);
        }
    };

    return (
        <div className="h-full space-y-6">
            <div className="flex gap-4 justify-center">
                <label className="flex items-center">
                    <input
                        type="radio"
                        checked={mode === 'encode'}
                        onChange={() => setMode('encode')}
                        className="mr-2"
                    />
                    Encode
                </label>
                <label className="flex items-center">
                    <input
                        type="radio"
                        checked={mode === 'decode'}
                        onChange={() => setMode('decode')}
                        className="mr-2"
                    />
                    Decode
                </label>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
                <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Input:
                    </label>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="w-full h-80 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                        placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter Base64 to decode...'}
                    />
                    <div className="flex gap-2">
                        <button
                            onClick={process}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            {mode === 'encode' ? 'Encode' : 'Decode'}
                        </button>
                        <button
                            onClick={() => { setInput(''); setOutput(''); }}
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                        >
                            Clear
                        </button>
                    </div>
                </div>

                <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Output:
                    </label>
                    <textarea
                        value={output}
                        readOnly
                        className="w-full h-80 p-3 border border-gray-300 rounded-md bg-gray-50 font-mono text-sm"
                        placeholder="Output will appear here..."
                    />
                    {output && !output.startsWith('Error:') && (
                        <button
                            onClick={() => navigator.clipboard.writeText(output)}
                            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                        >
                            Copy to Clipboard
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

const TextComparatorTool = () => {
    const [text1, setText1] = useState('');
    const [text2, setText2] = useState('');
    const [result, setResult] = useState('');

    const compare = () => {
        const lines1 = text1.split('\n');
        const lines2 = text2.split('\n');
        const maxLines = Math.max(lines1.length, lines2.length);
        let differences = 0;

        for (let i = 0; i < maxLines; i++) {
            const line1 = lines1[i] || '';
            const line2 = lines2[i] || '';
            if (line1 !== line2) {
                differences++;
            }
        }

        setResult(`Found ${differences} differences out of ${maxLines} lines`);
    };

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Text 1:
                    </label>
                    <textarea
                        value={text1}
                        onChange={(e) => setText1(e.target.value)}
                        className="w-full h-32 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter first text..."
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Text 2:
                    </label>
                    <textarea
                        value={text2}
                        onChange={(e) => setText2(e.target.value)}
                        className="w-full h-32 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter second text..."
                    />
                </div>
            </div>
            <button
                onClick={compare}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
                Compare
            </button>
            {result && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                    <p className="text-green-700">{result}</p>
                </div>
            )}
        </div>
    );
};

const HashGeneratorTool = () => {
    const [input, setInput] = useState('');
    const [hashes, setHashes] = useState<{ [key: string]: string }>({});

    const generateHashes = async () => {
        if (!input) return;

        const encoder = new TextEncoder();
        const data = encoder.encode(input);

        try {
            // MD5 (simplified simulation)
            const md5Hash = Array.from(data).map(b => b.toString(16).padStart(2, '0')).join('').substring(0, 32);

            // SHA-256
            const sha256Buffer = await crypto.subtle.digest('SHA-256', data);
            const sha256Hash = Array.from(new Uint8Array(sha256Buffer))
                .map(b => b.toString(16).padStart(2, '0'))
                .join('');

            setHashes({
                'MD5 (simulated)': md5Hash,
                'SHA-256': sha256Hash
            });
        } catch (err) {
            setHashes({ 'Error': 'Could not generate hashes' });
        }
    };

    return (
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Input Text:
                </label>
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="w-full h-24 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter text to hash..."
                />
            </div>
            <button
                onClick={generateHashes}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
                Generate Hashes
            </button>
            {Object.keys(hashes).length > 0 && (
                <div className="space-y-2">
                    {Object.entries(hashes).map(([type, hash]) => (
                        <div key={type}>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                {type}:
                            </label>
                            <input
                                type="text"
                                value={hash}
                                readOnly
                                className="w-full p-2 border border-gray-300 rounded-md bg-gray-50 text-sm font-mono"
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const PasswordGeneratorTool = () => {
    const [password, setPassword] = useState('');
    const [length, setLength] = useState(12);
    const [includeSymbols, setIncludeSymbols] = useState(true);
    const [includeNumbers, setIncludeNumbers] = useState(true);

    const generatePassword = () => {
        let chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (includeNumbers) chars += '0123456789';
        if (includeSymbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';

        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setPassword(result);
    };

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Length: {length}
                    </label>
                    <input
                        type="range"
                        min="4"
                        max="50"
                        value={length}
                        onChange={(e) => setLength(Number(e.target.value))}
                        className="w-full"
                    />
                </div>
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        checked={includeNumbers}
                        onChange={(e) => setIncludeNumbers(e.target.checked)}
                        className="mr-2"
                    />
                    <label className="text-sm">Include Numbers</label>
                </div>
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        checked={includeSymbols}
                        onChange={(e) => setIncludeSymbols(e.target.checked)}
                        className="mr-2"
                    />
                    <label className="text-sm">Include Symbols</label>
                </div>
            </div>
            <button
                onClick={generatePassword}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
                Generate Password
            </button>
            {password && (
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Generated Password:
                    </label>
                    <input
                        type="text"
                        value={password}
                        readOnly
                        className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 font-mono"
                    />
                </div>
            )}
        </div>
    );
};

const ListDiffTool = () => {
    const [list1, setList1] = useState('');
    const [list2, setList2] = useState('');
    const [result, setResult] = useState<{
        onlyInList1: string[];
        onlyInList2: string[];
        intersection: string[];
        union: string[];
        list1Count: number;
        list2Count: number;
    } | null>(null);
    const [separator, setSeparator] = useState('\n');
    const [caseInsensitive, setCaseInsensitive] = useState(false);
    const [removeSpaces, setRemoveSpaces] = useState(true);
    const [removeLeadingZeros, setRemoveLeadingZeros] = useState(false);
    const [sortResults, setSortResults] = useState(false);
    const [outputFormat, setOutputFormat] = useState<'plain' | 'numbered' | 'html'>('plain');

    const processItem = (item: string): string => {
        let processed = item;

        if (removeSpaces) {
            processed = processed.trim();
        }

        if (removeLeadingZeros) {
            processed = processed.replace(/^0+/, '') || '0';
        }

        if (caseInsensitive) {
            processed = processed.toLowerCase();
        }

        return processed;
    };

    const formatOutput = (items: string[]): string => {
        let formatted = items;

        if (sortResults) {
            formatted = [...items].sort();
        }

        switch (outputFormat) {
            case 'numbered':
                return formatted.map((item, index) => `${index + 1}. ${item}`).join('\n');
            case 'html':
                return `<ul>\n${formatted.map(item => `  <li>${item}</li>`).join('\n')}\n</ul>`;
            default:
                return formatted.join('\n');
        }
    };

    const compareLists = () => {
        const rawItems1 = list1.split(separator).filter(item => item.trim() !== '');
        const rawItems2 = list2.split(separator).filter(item => item.trim() !== '');

        const processedItems1 = rawItems1.map(processItem);
        const processedItems2 = rawItems2.map(processItem);

        // Remove duplicates
        const uniqueItems1 = [...new Set(processedItems1)];
        const uniqueItems2 = [...new Set(processedItems2)];

        const set1 = new Set(uniqueItems1);
        const set2 = new Set(uniqueItems2);

        // Calculate set operations
        const onlyInList1 = uniqueItems1.filter(item => !set2.has(item));
        const onlyInList2 = uniqueItems2.filter(item => !set1.has(item));
        const intersection = uniqueItems1.filter(item => set2.has(item));

        // Union: all unique items from both lists
        const union = [...new Set([...uniqueItems1, ...uniqueItems2])];

        setResult({
            onlyInList1,
            onlyInList2,
            intersection,
            union,
            list1Count: rawItems1.length,
            list2Count: rawItems2.length
        });
    };

    const clearAll = () => {
        setList1('');
        setList2('');
        setResult(null);
    };

    const swapLists = () => {
        const temp = list1;
        setList1(list2);
        setList2(temp);
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    const moveResultToList = (items: string[], targetList: 'list1' | 'list2') => {
        const formatted = formatOutput(items);
        if (targetList === 'list1') {
            setList1(formatted);
        } else {
            setList2(formatted);
        }
    };

    const sortList = (targetList: 'list1' | 'list2') => {
        if (targetList === 'list1') {
            const items = list1.split(separator).filter(item => item.trim() !== '').sort();
            setList1(items.join(separator));
        } else {
            const items = list2.split(separator).filter(item => item.trim() !== '').sort();
            setList2(items.join(separator));
        }
    };

    const removeEmptyLines = (targetList: 'list1' | 'list2') => {
        if (targetList === 'list1') {
            const items = list1.split(separator).filter(item => item.trim() !== '');
            setList1(items.join(separator));
        } else {
            const items = list2.split(separator).filter(item => item.trim() !== '');
            setList2(items.join(separator));
        }
    };

    const removeDuplicates = (targetList: 'list1' | 'list2') => {
        if (targetList === 'list1') {
            const items = [...new Set(list1.split(separator).filter(item => item.trim() !== ''))];
            setList1(items.join(separator));
        } else {
            const items = [...new Set(list2.split(separator).filter(item => item.trim() !== ''))];
            setList2(items.join(separator));
        }
    };

    return (
        <div className="h-full space-y-6">
            {/* Processing Options */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Processing Options</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Separator Selection */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Separator:</label>
                        <select
                            value={separator}
                            onChange={(e) => setSeparator(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md text-sm"
                        >
                            <option value="\n">New Line</option>
                            <option value=",">Comma</option>
                            <option value=";">Semicolon</option>
                            <option value=" ">Space</option>
                            <option value="\t">Tab</option>
                        </select>
                    </div>

                    {/* Output Format */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Output Format:</label>
                        <select
                            value={outputFormat}
                            onChange={(e) => setOutputFormat(e.target.value as 'plain' | 'numbered' | 'html')}
                            className="w-full p-2 border border-gray-300 rounded-md text-sm"
                        >
                            <option value="plain">Plain</option>
                            <option value="numbered">Numbered</option>
                            <option value="html">HTML List</option>
                        </select>
                    </div>

                    {/* Processing Checkboxes */}
                    <div className="space-y-2">
                        <label className="flex items-center text-sm">
                            <input
                                type="checkbox"
                                checked={caseInsensitive}
                                onChange={(e) => setCaseInsensitive(e.target.checked)}
                                className="mr-2"
                            />
                            Case Insensitive
                        </label>
                        <label className="flex items-center text-sm">
                            <input
                                type="checkbox"
                                checked={removeSpaces}
                                onChange={(e) => setRemoveSpaces(e.target.checked)}
                                className="mr-2"
                            />
                            Remove Extra Spaces
                        </label>
                    </div>

                    <div className="space-y-2">
                        <label className="flex items-center text-sm">
                            <input
                                type="checkbox"
                                checked={removeLeadingZeros}
                                onChange={(e) => setRemoveLeadingZeros(e.target.checked)}
                                className="mr-2"
                            />
                            Remove Leading Zeros
                        </label>
                        <label className="flex items-center text-sm">
                            <input
                                type="checkbox"
                                checked={sortResults}
                                onChange={(e) => setSortResults(e.target.checked)}
                                className="mr-2"
                            />
                            Sort Results
                        </label>
                    </div>
                </div>
            </div>

            {/* Input Lists with Controls */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* List A */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <label className="block text-sm font-medium text-gray-700">
                            List A ({list1.split(separator).filter(item => item.trim() !== '').length} items)
                        </label>
                        <div className="flex gap-1">
                            <button
                                onClick={() => sortList('list1')}
                                className="px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                                title="Sort List A"
                            >
                                ↕ Sort
                            </button>
                            <button
                                onClick={() => removeEmptyLines('list1')}
                                className="px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                                title="Remove Empty Lines"
                            >
                                🗑 Empty
                            </button>
                            <button
                                onClick={() => removeDuplicates('list1')}
                                className="px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                                title="Remove Duplicates"
                            >
                                📋 Dedup
                            </button>
                            <button
                                onClick={() => copyToClipboard(list1)}
                                className="px-2 py-1 text-xs bg-blue-200 text-blue-700 rounded hover:bg-blue-300"
                                title="Copy List A"
                            >
                                📄 Copy
                            </button>
                        </div>
                    </div>
                    <textarea
                        value={list1}
                        onChange={(e) => setList1(e.target.value)}
                        className="w-full h-64 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                        placeholder={`Enter items separated by ${separator === '\n' ? 'new lines' : separator === ',' ? 'commas' : separator === ';' ? 'semicolons' : separator === ' ' ? 'spaces' : 'tabs'}...`}
                    />
                </div>

                {/* List B */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <label className="block text-sm font-medium text-gray-700">
                            List B ({list2.split(separator).filter(item => item.trim() !== '').length} items)
                        </label>
                        <div className="flex gap-1">
                            <button
                                onClick={() => sortList('list2')}
                                className="px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                                title="Sort List B"
                            >
                                ↕ Sort
                            </button>
                            <button
                                onClick={() => removeEmptyLines('list2')}
                                className="px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                                title="Remove Empty Lines"
                            >
                                🗑 Empty
                            </button>
                            <button
                                onClick={() => removeDuplicates('list2')}
                                className="px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                                title="Remove Duplicates"
                            >
                                📋 Dedup
                            </button>
                            <button
                                onClick={() => copyToClipboard(list2)}
                                className="px-2 py-1 text-xs bg-blue-200 text-blue-700 rounded hover:bg-blue-300"
                                title="Copy List B"
                            >
                                📄 Copy
                            </button>
                        </div>
                    </div>
                    <textarea
                        value={list2}
                        onChange={(e) => setList2(e.target.value)}
                        className="w-full h-64 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                        placeholder={`Enter items separated by ${separator === '\n' ? 'new lines' : separator === ',' ? 'commas' : separator === ';' ? 'semicolons' : separator === ' ' ? 'spaces' : 'tabs'}...`}
                    />
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center">
                <button
                    onClick={compareLists}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    disabled={!list1.trim() || !list2.trim()}
                >
                    🔍 Compare Lists
                </button>
                <button
                    onClick={swapLists}
                    className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                    disabled={!list1.trim() && !list2.trim()}
                >
                    🔄 Swap A ↔ B
                </button>
                <button
                    onClick={clearAll}
                    className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                    🗑 Clear All
                </button>
            </div>

            {/* Results */}
            {result && (
                <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-gray-900 text-center">Set Operations Results</h3>

                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
                        {/* A Only (A - B) */}
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                            <div className="flex justify-between items-center mb-2">
                                <h4 className="font-medium text-red-800 flex items-center">
                                    <span className="bg-red-200 text-red-800 text-xs px-2 py-1 rounded mr-2">
                                        {result.onlyInList1.length}
                                    </span>
                                    A Only (A - B)
                                </h4>
                                <div className="flex gap-1">
                                    <button
                                        onClick={() => copyToClipboard(formatOutput(result.onlyInList1))}
                                        className="px-2 py-1 text-xs bg-red-200 text-red-700 rounded hover:bg-red-300"
                                        title="Copy A Only"
                                    >
                                        📄
                                    </button>
                                    <button
                                        onClick={() => moveResultToList(result.onlyInList1, 'list1')}
                                        className="px-2 py-1 text-xs bg-red-200 text-red-700 rounded hover:bg-red-300"
                                        title="Move to List A"
                                    >
                                        →A
                                    </button>
                                    <button
                                        onClick={() => moveResultToList(result.onlyInList1, 'list2')}
                                        className="px-2 py-1 text-xs bg-red-200 text-red-700 rounded hover:bg-red-300"
                                        title="Move to List B"
                                    >
                                        →B
                                    </button>
                                </div>
                            </div>
                            <div className="max-h-40 overflow-y-auto">
                                {result.onlyInList1.length > 0 ? (
                                    <ul className="text-sm text-red-700 space-y-1">
                                        {(sortResults ? [...result.onlyInList1].sort() : result.onlyInList1).map((item, index) => (
                                            <li key={index} className="bg-red-100 px-2 py-1 rounded font-mono text-xs">
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-sm text-red-600 italic">No unique items</p>
                                )}
                            </div>
                        </div>

                        {/* A ∩ B (Intersection) */}
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                            <div className="flex justify-between items-center mb-2">
                                <h4 className="font-medium text-green-800 flex items-center">
                                    <span className="bg-green-200 text-green-800 text-xs px-2 py-1 rounded mr-2">
                                        {result.intersection.length}
                                    </span>
                                    A ∩ B (Common)
                                </h4>
                                <div className="flex gap-1">
                                    <button
                                        onClick={() => copyToClipboard(formatOutput(result.intersection))}
                                        className="px-2 py-1 text-xs bg-green-200 text-green-700 rounded hover:bg-green-300"
                                        title="Copy Intersection"
                                    >
                                        📄
                                    </button>
                                    <button
                                        onClick={() => moveResultToList(result.intersection, 'list1')}
                                        className="px-2 py-1 text-xs bg-green-200 text-green-700 rounded hover:bg-green-300"
                                        title="Move to List A"
                                    >
                                        →A
                                    </button>
                                    <button
                                        onClick={() => moveResultToList(result.intersection, 'list2')}
                                        className="px-2 py-1 text-xs bg-green-200 text-green-700 rounded hover:bg-green-300"
                                        title="Move to List B"
                                    >
                                        →B
                                    </button>
                                </div>
                            </div>
                            <div className="max-h-40 overflow-y-auto">
                                {result.intersection.length > 0 ? (
                                    <ul className="text-sm text-green-700 space-y-1">
                                        {(sortResults ? [...result.intersection].sort() : result.intersection).map((item, index) => (
                                            <li key={index} className="bg-green-100 px-2 py-1 rounded font-mono text-xs">
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-sm text-green-600 italic">No common items</p>
                                )}
                            </div>
                        </div>

                        {/* B Only (B - A) */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <div className="flex justify-between items-center mb-2">
                                <h4 className="font-medium text-blue-800 flex items-center">
                                    <span className="bg-blue-200 text-blue-800 text-xs px-2 py-1 rounded mr-2">
                                        {result.onlyInList2.length}
                                    </span>
                                    B Only (B - A)
                                </h4>
                                <div className="flex gap-1">
                                    <button
                                        onClick={() => copyToClipboard(formatOutput(result.onlyInList2))}
                                        className="px-2 py-1 text-xs bg-blue-200 text-blue-700 rounded hover:bg-blue-300"
                                        title="Copy B Only"
                                    >
                                        📄
                                    </button>
                                    <button
                                        onClick={() => moveResultToList(result.onlyInList2, 'list1')}
                                        className="px-2 py-1 text-xs bg-blue-200 text-blue-700 rounded hover:bg-blue-300"
                                        title="Move to List A"
                                    >
                                        →A
                                    </button>
                                    <button
                                        onClick={() => moveResultToList(result.onlyInList2, 'list2')}
                                        className="px-2 py-1 text-xs bg-blue-200 text-blue-700 rounded hover:bg-blue-300"
                                        title="Move to List B"
                                    >
                                        →B
                                    </button>
                                </div>
                            </div>
                            <div className="max-h-40 overflow-y-auto">
                                {result.onlyInList2.length > 0 ? (
                                    <ul className="text-sm text-blue-700 space-y-1">
                                        {(sortResults ? [...result.onlyInList2].sort() : result.onlyInList2).map((item, index) => (
                                            <li key={index} className="bg-blue-100 px-2 py-1 rounded font-mono text-xs">
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-sm text-blue-600 italic">No unique items</p>
                                )}
                            </div>
                        </div>

                        {/* A ∪ B (Union) */}
                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                            <div className="flex justify-between items-center mb-2">
                                <h4 className="font-medium text-purple-800 flex items-center">
                                    <span className="bg-purple-200 text-purple-800 text-xs px-2 py-1 rounded mr-2">
                                        {result.union.length}
                                    </span>
                                    A ∪ B (Union)
                                </h4>
                                <div className="flex gap-1">
                                    <button
                                        onClick={() => copyToClipboard(formatOutput(result.union))}
                                        className="px-2 py-1 text-xs bg-purple-200 text-purple-700 rounded hover:bg-purple-300"
                                        title="Copy Union"
                                    >
                                        📄
                                    </button>
                                    <button
                                        onClick={() => moveResultToList(result.union, 'list1')}
                                        className="px-2 py-1 text-xs bg-purple-200 text-purple-700 rounded hover:bg-purple-300"
                                        title="Move to List A"
                                    >
                                        →A
                                    </button>
                                    <button
                                        onClick={() => moveResultToList(result.union, 'list2')}
                                        className="px-2 py-1 text-xs bg-purple-200 text-purple-700 rounded hover:bg-purple-300"
                                        title="Move to List B"
                                    >
                                        →B
                                    </button>
                                </div>
                            </div>
                            <div className="max-h-40 overflow-y-auto">
                                {result.union.length > 0 ? (
                                    <ul className="text-sm text-purple-700 space-y-1">
                                        {(sortResults ? [...result.union].sort() : result.union).map((item, index) => (
                                            <li key={index} className="bg-purple-100 px-2 py-1 rounded font-mono text-xs">
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-sm text-purple-600 italic">No items</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Enhanced Summary */}
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <h4 className="font-medium text-gray-800 mb-4">📊 Set Operations Summary</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 text-sm">
                            <div className="text-center">
                                <div className="font-semibold text-lg text-gray-900">
                                    {result.list1Count}
                                </div>
                                <div className="text-gray-600">List A Items</div>
                            </div>
                            <div className="text-center">
                                <div className="font-semibold text-lg text-gray-900">
                                    {result.list2Count}
                                </div>
                                <div className="text-gray-600">List B Items</div>
                            </div>
                            <div className="text-center">
                                <div className="font-semibold text-lg text-red-600">
                                    {result.onlyInList1.length}
                                </div>
                                <div className="text-gray-600">A Only</div>
                            </div>
                            <div className="text-center">
                                <div className="font-semibold text-lg text-green-600">
                                    {result.intersection.length}
                                </div>
                                <div className="text-gray-600">Common</div>
                            </div>
                            <div className="text-center">
                                <div className="font-semibold text-lg text-blue-600">
                                    {result.onlyInList2.length}
                                </div>
                                <div className="text-gray-600">B Only</div>
                            </div>
                            <div className="text-center">
                                <div className="font-semibold text-lg text-purple-600">
                                    {result.union.length}
                                </div>
                                <div className="text-gray-600">Union</div>
                            </div>
                        </div>

                        {/* Similarity Percentage */}
                        <div className="mt-4 text-center">
                            <div className="text-lg font-semibold text-gray-900">
                                {result.union.length > 0 ?
                                    ((result.intersection.length / result.union.length) * 100).toFixed(1) : 0}%
                                <span className="text-sm font-normal text-gray-600">Similarity</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// JSONPath Tester Tool
const JsonPathTesterTool = () => {
    const [jsonData, setJsonData] = useState(`{
  "store": {
    "book": [
      {
        "category": "reference",
        "author": "Nigel Rees",
        "title": "Sayings of the Century",
        "price": 8.95,
        "isbn": "0-553-21311-3"
      },
      {
        "category": "fiction",
        "author": "Evelyn Waugh",
        "title": "Sword of Honour",
        "price": 12.99,
        "isbn": "0-452-28423-7"
      },
      {
        "category": "fiction",
        "author": "Herman Melville",
        "title": "Moby Dick",
        "price": 8.99,
        "isbn": "0-553-21311-3"
      },
      {
        "category": "fiction",
        "author": "J. R. R. Tolkien",
        "title": "The Lord of the Rings",
        "price": 22.99,
        "isbn": "0-395-19395-8"
      }
    ],
    "bicycle": {
      "color": "red",
      "price": 19.95
    }
  }
}`);
    const [jsonPath, setJsonPath] = useState('$.store.book[*].author');
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState('');

    const commonPaths = [
        { path: '$.store.book[*].author', description: 'All book authors' },
        { path: '$.store.book[?(@.price < 10)]', description: 'Books under $10' },
        { path: '$.store.book[0]', description: 'First book' },
        { path: '$.store.book[-1]', description: 'Last book' },
        { path: '$.store.book[*].price', description: 'All book prices' },
        { path: '$.store.bicycle.color', description: 'Bicycle color' },
        { path: '$..price', description: 'All prices (recursive)' },
        { path: '$.store.book[?(@.category=="fiction")]', description: 'Fiction books' },
        { path: '$.store.book.length', description: 'Number of books' },
        { path: '$.store.*', description: 'Store children' }
    ];

    // Simple JSONPath implementation
    const evaluateJsonPath = (data: any, path: string): any => {
        try {
            // Handle root selector
            if (path === '$' || path === '') {
                return data;
            }

            // Remove leading $. if present
            let normalizedPath = path.startsWith('$.') ? path.substring(2) : path;
            if (normalizedPath.startsWith('$')) {
                normalizedPath = normalizedPath.substring(1);
            }

            // Handle recursive descent (..)
            if (path.includes('..')) {
                const recursiveFind = (obj: any, key: string): any[] => {
                    const results: any[] = [];
                    const search = (current: any) => {
                        if (current && typeof current === 'object') {
                            if (Array.isArray(current)) {
                                current.forEach((item) => {
                                    if (key === 'price' && item && typeof item === 'object' && 'price' in item) {
                                        results.push(item.price);
                                    }
                                    search(item);
                                });
                            } else {
                                Object.keys(current).forEach(k => {
                                    if (k === key) {
                                        results.push(current[k]);
                                    }
                                    search(current[k]);
                                });
                            }
                        }
                    };
                    search(obj);
                    return results;
                };

                if (path === '$..price') {
                    return recursiveFind(data, 'price');
                }
            }

            // Split path into segments
            const segments = normalizedPath.split(/[\.\[\]]/).filter(s => s.length > 0);
            let current = data;

            for (let i = 0; i < segments.length; i++) {
                const segment = segments[i];

                // Handle array index or wildcard
                if (segment === '*') {
                    if (Array.isArray(current)) {
                        const remaining = segments.slice(i + 1).join('.');
                        if (remaining) {
                            return current.map(item => evaluateJsonPath(item, remaining)).flat();
                        } else {
                            return current;
                        }
                    } else if (current && typeof current === 'object') {
                        const remaining = segments.slice(i + 1).join('.');
                        if (remaining) {
                            return Object.values(current).map(item => evaluateJsonPath(item, remaining)).flat();
                        } else {
                            return Object.values(current);
                        }
                    }
                    return null;
                }

                // Handle array index
                if (/^\d+$/.test(segment)) {
                    const index = parseInt(segment);
                    if (Array.isArray(current)) {
                        current = current[index];
                    } else {
                        return null;
                    }
                    continue;
                }

                // Handle negative array index
                if (/^-\d+$/.test(segment)) {
                    const index = parseInt(segment);
                    if (Array.isArray(current)) {
                        current = current[current.length + index];
                    } else {
                        return null;
                    }
                    continue;
                }

                // Handle filter expressions
                if (segment.includes('?')) {
                    if (Array.isArray(current)) {
                        // Simple filter for price comparison
                        if (segment.includes('@.price < 10')) {
                            return current.filter(item => item && item.price && item.price < 10);
                        }
                        if (segment.includes('@.category=="fiction"')) {
                            return current.filter(item => item && item.category === 'fiction');
                        }
                    }
                    return null;
                }

                // Handle property access
                if (current && typeof current === 'object' && segment in current) {
                    current = current[segment];
                } else if (segment === 'length' && Array.isArray(current)) {
                    current = current.length;
                } else {
                    return null;
                }
            }

            return current;
        } catch (e) {
            throw new Error(`Error evaluating path: ${e}`);
        }
    };

    const executeJsonPath = () => {
        try {
            setError('');
            const data = JSON.parse(jsonData);
            const pathResult = evaluateJsonPath(data, jsonPath);
            setResult(pathResult);
        } catch (e) {
            setError(e instanceof Error ? e.message : 'Invalid JSON or JSONPath expression');
            setResult(null);
        }
    };

    const handlePathClick = (path: string) => {
        setJsonPath(path);
    };

    return (
        <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* JSON Data Input */}
                <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-700">
                        JSON Data:
                    </label>
                    <textarea
                        value={jsonData}
                        onChange={(e) => setJsonData(e.target.value)}
                        className="w-full h-80 p-3 border border-gray-300 rounded-lg font-mono text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter JSON data..."
                    />
                </div>

                {/* JSONPath Expression and Result */}
                <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-700">
                        JSONPath Expression:
                    </label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={jsonPath}
                            onChange={(e) => setJsonPath(e.target.value)}
                            className="flex-1 p-3 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="$.store.book[*].author"
                        />
                        <button
                            onClick={executeJsonPath}
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                        >
                            Execute
                        </button>
                    </div>

                    {/* Result Display */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Result:</label>
                        {error && (
                            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                                <p className="text-red-600 text-sm">{error}</p>
                            </div>
                        )}
                        {result !== null && !error && (
                            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                                <pre className="text-sm text-gray-800 whitespace-pre-wrap font-mono">
                                    {JSON.stringify(result, null, 2)}
                                </pre>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Common JSONPath Examples */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">Common JSONPath Examples:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {commonPaths.map((example, index) => (
                        <button
                            key={index}
                            onClick={() => handlePathClick(example.path)}
                            className="p-3 text-left bg-white border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors group"
                        >
                            <div className="font-mono text-sm text-blue-600 group-hover:text-blue-700 mb-1">
                                {example.path}
                            </div>
                            <div className="text-xs text-gray-600">{example.description}</div>
                        </button>
                    ))}
                </div>
            </div>

            {/* JSONPath Syntax Help */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">JSONPath Syntax Reference:</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                            <h4 className="font-medium mb-2">Basic Operators:</h4>
                            <ul className="space-y-1 text-gray-700">
                                <li><code className="bg-gray-200 px-1 rounded">$</code> - Root element</li>
                                <li><code className="bg-gray-200 px-1 rounded">@</code> - Current element</li>
                                <li><code className="bg-gray-200 px-1 rounded">.</code> - Child operator</li>
                                <li><code className="bg-gray-200 px-1 rounded">..</code> - Recursive descent</li>
                                <li><code className="bg-gray-200 px-1 rounded">*</code> - Wildcard</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-medium mb-2">Array Operations:</h4>
                            <ul className="space-y-1 text-gray-700">
                                <li><code className="bg-gray-200 px-1 rounded">[n]</code> - Array index</li>
                                <li><code className="bg-gray-200 px-1 rounded">[-n]</code> - Negative index</li>
                                <li><code className="bg-gray-200 px-1 rounded">[?()]</code> - Filter expression</li>
                                <li><code className="bg-gray-200 px-1 rounded">.length</code> - Array length</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const JsonDiffTool = () => {
    const [json1, setJson1] = useState('');
    const [json2, setJson2] = useState('');
    const [error1, setError1] = useState('');
    const [error2, setError2] = useState('');
    const [diffResult, setDiffResult] = useState<any>(null);
    const [viewMode, setViewMode] = useState<'side-by-side' | 'unified'>('side-by-side');
    const [ignoreOrder, setIgnoreOrder] = useState(false);
    const [ignoreCase, setIgnoreCase] = useState(false);

    // Deep comparison function
    const deepCompare = (obj1: any, obj2: any, path: string = '', differences: any[] = []): any[] => {
        const type1 = getType(obj1);
        const type2 = getType(obj2);

        if (type1 !== type2) {
            differences.push({
                path,
                type: 'type_mismatch',
                left: obj1,
                right: obj2,
                leftType: type1,
                rightType: type2
            });
            return differences;
        }

        if (type1 === 'object') {
            const keys1 = Object.keys(obj1 || {});
            const keys2 = Object.keys(obj2 || {});
            const allKeys = [...new Set([...keys1, ...keys2])];

            for (const key of allKeys) {
                const newPath = path ? `${path}.${key}` : key;
                const val1 = obj1?.[key];
                const val2 = obj2?.[key];

                if (!(key in (obj1 || {}))) {
                    differences.push({
                        path: newPath,
                        type: 'added',
                        right: val2
                    });
                } else if (!(key in (obj2 || {}))) {
                    differences.push({
                        path: newPath,
                        type: 'removed',
                        left: val1
                    });
                } else {
                    deepCompare(val1, val2, newPath, differences);
                }
            }
        } else if (type1 === 'array') {
            const arr1 = obj1 || [];
            const arr2 = obj2 || [];

            if (ignoreOrder) {
                // Compare arrays ignoring order
                const sorted1 = [...arr1].sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b)));
                const sorted2 = [...arr2].sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b)));

                const maxLength = Math.max(sorted1.length, sorted2.length);
                for (let i = 0; i < maxLength; i++) {
                    const newPath = `${path}[${i}]`;
                    if (i >= sorted1.length) {
                        differences.push({
                            path: newPath,
                            type: 'added',
                            right: sorted2[i]
                        });
                    } else if (i >= sorted2.length) {
                        differences.push({
                            path: newPath,
                            type: 'removed',
                            left: sorted1[i]
                        });
                    } else {
                        deepCompare(sorted1[i], sorted2[i], newPath, differences);
                    }
                }
            } else {
                // Compare arrays preserving order
                const maxLength = Math.max(arr1.length, arr2.length);
                for (let i = 0; i < maxLength; i++) {
                    const newPath = `${path}[${i}]`;
                    if (i >= arr1.length) {
                        differences.push({
                            path: newPath,
                            type: 'added',
                            right: arr2[i]
                        });
                    } else if (i >= arr2.length) {
                        differences.push({
                            path: newPath,
                            type: 'removed',
                            left: arr1[i]
                        });
                    } else {
                        deepCompare(arr1[i], arr2[i], newPath, differences);
                    }
                }
            }
        } else {
            // Primitive values
            let val1 = obj1;
            let val2 = obj2;

            if (ignoreCase && typeof val1 === 'string' && typeof val2 === 'string') {
                val1 = val1.toLowerCase();
                val2 = val2.toLowerCase();
            }

            if (val1 !== val2) {
                differences.push({
                    path,
                    type: 'modified',
                    left: obj1,
                    right: obj2
                });
            }
        }

        return differences;
    };

    const getType = (value: any): string => {
        if (value === null) return 'null';
        if (Array.isArray(value)) return 'array';
        return typeof value;
    };

    const parseJson = (jsonStr: string, setError: (error: string) => void) => {
        try {
            if (!jsonStr.trim()) {
                setError('');
                return null;
            }
            const parsed = JSON.parse(jsonStr);
            setError('');
            return parsed;
        } catch (err) {
            setError(`Invalid JSON: ${(err as Error).message}`);
            return null;
        }
    };

    const compareJsons = () => {
        const parsed1 = parseJson(json1, setError1);
        const parsed2 = parseJson(json2, setError2);

        if (parsed1 !== null && parsed2 !== null) {
            const differences = deepCompare(parsed1, parsed2);
            setDiffResult({
                differences,
                identical: differences.length === 0,
                totalDiffs: differences.length
            });
        } else {
            setDiffResult(null);
        }
    };

    const clearAll = () => {
        setJson1('');
        setJson2('');
        setError1('');
        setError2('');
        setDiffResult(null);
    };

    const swapJsons = () => {
        const temp = json1;
        setJson1(json2);
        setJson2(temp);
    };

    const getChangeIcon = (type: string) => {
        switch (type) {
            case 'added': return '➕';
            case 'removed': return '➖';
            case 'modified': return '🔄';
            case 'type_mismatch': return '⚠️';
            default: return '📝';
        }
    };

    const getChangeColor = (type: string) => {
        switch (type) {
            case 'added': return 'text-green-700 bg-green-50 border-green-200';
            case 'removed': return 'text-red-700 bg-red-50 border-red-200';
            case 'modified': return 'text-blue-700 bg-blue-50 border-blue-200';
            case 'type_mismatch': return 'text-orange-700 bg-orange-50 border-orange-200';
            default: return 'text-gray-700 bg-gray-50 border-gray-200';
        }
    };

    return (
        <div className="h-full space-y-6">
            {/* Options */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Comparison Options</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">View Mode:</label>
                        <select
                            value={viewMode}
                            onChange={(e) => setViewMode(e.target.value as 'side-by-side' | 'unified')}
                            className="w-full p-2 border border-gray-300 rounded-md text-sm"
                        >
                            <option value="side-by-side">Side by Side</option>
                            <option value="unified">Unified View</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="flex items-center text-sm">
                            <input
                                type="checkbox"
                                checked={ignoreOrder}
                                onChange={(e) => setIgnoreOrder(e.target.checked)}
                                className="mr-2"
                            />
                            Ignore Array Order
                        </label>
                        <label className="flex items-center text-sm">
                            <input
                                type="checkbox"
                                checked={ignoreCase}
                                onChange={(e) => setIgnoreCase(e.target.checked)}
                                className="mr-2"
                            />
                            Ignore String Case
                        </label>
                    </div>

                    <div className="flex items-end">
                        <div className="space-y-2">
                            <button
                                onClick={swapJsons}
                                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 text-sm mr-2"
                                disabled={!json1.trim() && !json2.trim()}
                            >
                                🔄 Swap
                            </button>
                            <button
                                onClick={clearAll}
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 text-sm"
                            >
                                🗑 Clear
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* JSON Input Areas */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <label className="block text-sm font-medium text-gray-700">
                            JSON 1 (Left):
                        </label>
                        <button
                            onClick={() => navigator.clipboard.writeText(json1)}
                            className="px-2 py-1 text-xs bg-blue-200 text-blue-700 rounded hover:bg-blue-300"
                            disabled={!json1.trim()}
                        >
                            📄 Copy
                        </button>
                    </div>
                    <textarea
                        value={json1}
                        onChange={(e) => setJson1(e.target.value)}
                        className="w-full h-80 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                        placeholder="Paste your first JSON here..."
                    />
                    {error1 && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                            <p className="text-red-700 text-sm">{error1}</p>
                        </div>
                    )}
                </div>

                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <label className="block text-sm font-medium text-gray-700">
                            JSON 2 (Right):
                        </label>
                        <button
                            onClick={() => navigator.clipboard.writeText(json2)}
                            className="px-2 py-1 text-xs bg-blue-200 text-blue-700 rounded hover:bg-blue-300"
                            disabled={!json2.trim()}
                        >
                            📄 Copy
                        </button>
                    </div>
                    <textarea
                        value={json2}
                        onChange={(e) => setJson2(e.target.value)}
                        className="w-full h-80 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                        placeholder="Paste your second JSON here..."
                    />
                    {error2 && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                            <p className="text-red-700 text-sm">{error2}</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Compare Button */}
            <div className="flex justify-center">
                <button
                    onClick={compareJsons}
                    className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
                    disabled={!json1.trim() || !json2.trim() || !!error1 || !!error2}
                >
                    🔍 Compare JSON Objects
                </button>
            </div>

            {/* Results */}
            {diffResult && (
                <div className="space-y-6">
                    {/* Summary */}
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            Comparison Summary
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                            <div className="text-center">
                                <div className={`font-semibold text-lg ${diffResult.identical ? 'text-green-600' : 'text-red-600'}`}>
                                    {diffResult.identical ? '✅ Identical' : '❌ Different'}
                                </div>
                                <div className="text-gray-600">Status</div>
                            </div>
                            <div className="text-center">
                                <div className="font-semibold text-lg text-gray-900">
                                    {diffResult.totalDiffs}
                                </div>
                                <div className="text-gray-600">Total Differences</div>
                            </div>
                            <div className="text-center">
                                <div className="font-semibold text-lg text-red-600">
                                    {diffResult.differences.filter((d: any) => d.type === 'removed').length}
                                </div>
                                <div className="text-gray-600">Removed</div>
                            </div>
                            <div className="text-center">
                                <div className="font-semibold text-lg text-green-600">
                                    {diffResult.differences.filter((d: any) => d.type === 'added').length}
                                </div>
                                <div className="text-gray-600">Added</div>
                            </div>
                        </div>
                    </div>

                    {/* Differences List */}
                    {diffResult.differences.length > 0 && (
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                📋 Detailed Differences ({diffResult.differences.length})
                            </h3>
                            <div className="space-y-3 max-h-96 overflow-y-auto">
                                {diffResult.differences.map((diff: any, index: number) => (
                                    <div
                                        key={index}
                                        className={`border rounded-lg p-3 ${getChangeColor(diff.type)}`}
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center mb-2">
                                                    <span className="mr-2">{getChangeIcon(diff.type)}</span>
                                                    <span className="font-medium text-sm">
                                                        Path: <code className="bg-gray-100 px-1 rounded text-xs">{diff.path || '(root)'}</code>
                                                    </span>
                                                    <span className="ml-2 text-xs px-2 py-1 bg-white rounded">
                                                        {diff.type.replace('_', ' ').toUpperCase()}
                                                    </span>
                                                </div>

                                                {diff.type === 'type_mismatch' && (
                                                    <div className="text-sm">
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                            <div>
                                                                <span className="font-medium">Left Type:</span> {diff.leftType}
                                                                <div className="bg-white p-2 rounded text-xs font-mono mt-1">
                                                                    {JSON.stringify(diff.left, null, 2)}
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <span className="font-medium">Right Type:</span> {diff.rightType}
                                                                <div className="bg-white p-2 rounded text-xs font-mono mt-1">
                                                                    {JSON.stringify(diff.right, null, 2)}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}

                                                {diff.type === 'modified' && (
                                                    <div className="text-sm">
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                            <div>
                                                                <span className="font-medium">Before:</span>
                                                                <div className="bg-white p-2 rounded text-xs font-mono mt-1">
                                                                    {JSON.stringify(diff.left, null, 2)}
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <span className="font-medium">After:</span>
                                                                <div className="bg-white p-2 rounded text-xs font-mono mt-1">
                                                                    {JSON.stringify(diff.right, null, 2)}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}

                                                {diff.type === 'added' && (
                                                    <div className="text-sm">
                                                        <span className="font-medium">Added Value:</span>
                                                        <div className="bg-white p-2 rounded text-xs font-mono mt-1">
                                                            {JSON.stringify(diff.right, null, 2)}
                                                        </div>
                                                    </div>
                                                )}

                                                {diff.type === 'removed' && (
                                                    <div className="text-sm">
                                                        <span className="font-medium">Removed Value:</span>
                                                        <div className="bg-white p-2 rounded text-xs font-mono mt-1">
                                                            {JSON.stringify(diff.left, null, 2)}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Home;