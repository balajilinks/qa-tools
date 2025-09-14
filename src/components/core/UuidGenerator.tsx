import React, { useState } from 'react';
import ToolHeader from '../ToolHeader';

const UuidGenerator: React.FC = () => {
    const [generatedUuids, setGeneratedUuids] = useState<string[]>([]);
    const [validateInput, setValidateInput] = useState('');
    const [validationResult, setValidationResult] = useState<{ isValid: boolean; version?: number; variant?: string } | null>(null);
    const [count, setCount] = useState(1);

    // Generate UUID v4
    const generateUuidV4 = (): string => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };

    // Generate UUID v1 (timestamp-based)
    const generateUuidV1 = (): string => {
        const timestamp = Date.now();
        const random = Math.random().toString(16).substr(2, 8);
        const timestampHex = timestamp.toString(16).padStart(12, '0');

        return [
            timestampHex.substr(0, 8),
            timestampHex.substr(8, 4),
            '1' + timestampHex.substr(12, 3),
            '8' + random.substr(0, 3),
            random.substr(3, 8) + Math.random().toString(16).substr(2, 4)
        ].join('-');
    };

    const generateUuids = (version: number) => {
        const newUuids: string[] = [];
        for (let i = 0; i < count; i++) {
            if (version === 1) {
                newUuids.push(generateUuidV1());
            } else {
                newUuids.push(generateUuidV4());
            }
        }
        setGeneratedUuids(newUuids);
    };

    const validateUuid = (uuid: string) => {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

        if (!uuidRegex.test(uuid)) {
            setValidationResult({ isValid: false });
            return;
        }

        const versionChar = uuid.charAt(14);
        const variantChar = uuid.charAt(19);

        let version: number;
        switch (versionChar) {
            case '1': version = 1; break;
            case '2': version = 2; break;
            case '3': version = 3; break;
            case '4': version = 4; break;
            case '5': version = 5; break;
            default: version = parseInt(versionChar);
        }

        let variant: string;
        const variantBits = parseInt(variantChar, 16);
        if ((variantBits & 0x8) === 0) {
            variant = 'NCS backward compatibility';
        } else if ((variantBits & 0xC) === 0x8) {
            variant = 'RFC 4122';
        } else if ((variantBits & 0xE) === 0xC) {
            variant = 'Microsoft GUID';
        } else {
            variant = 'Reserved for future';
        }

        setValidationResult({ isValid: true, version, variant });
    };

    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const copyAllUuids = () => {
        copyToClipboard(generatedUuids.join('\n'));
    };

    const clearGenerated = () => {
        setGeneratedUuids([]);
    };

    const clearValidation = () => {
        setValidateInput('');
        setValidationResult(null);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <ToolHeader
                title="UUID Generator & Validator"
                description="Generate UUIDs (v1, v4) and validate existing UUIDs with detailed information"
            />
            <div className="max-w-7xl mx-auto p-6">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Generator */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">UUID Generator</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Number of UUIDs to generate
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    max="100"
                                    value={count}
                                    onChange={(e) => setCount(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => generateUuids(4)}
                                    className="flex-1 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    Generate UUID v4
                                </button>
                                <button
                                    onClick={() => generateUuids(1)}
                                    className="flex-1 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                                >
                                    Generate UUID v1
                                </button>
                            </div>

                            {generatedUuids.length > 0 && (
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="font-medium">Generated UUIDs ({generatedUuids.length})</span>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={copyAllUuids}
                                                className="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600 text-sm"
                                            >
                                                Copy All
                                            </button>
                                            <button
                                                onClick={clearGenerated}
                                                className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 text-sm"
                                            >
                                                Clear
                                            </button>
                                        </div>
                                    </div>

                                    <div className="max-h-64 overflow-y-auto border border-gray-200 rounded-md">
                                        {generatedUuids.map((uuid, index) => (
                                            <div key={index} className="flex items-center justify-between p-3 border-b border-gray-100 last:border-b-0">
                                                <code className="font-mono text-sm bg-gray-50 px-2 py-1 rounded flex-1">
                                                    {uuid}
                                                </code>
                                                <button
                                                    onClick={() => copyToClipboard(uuid)}
                                                    className="ml-2 px-2 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-xs"
                                                >
                                                    Copy
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* UUID Information */}
                        <div className="mt-6 p-4 bg-blue-50 rounded-md">
                            <h3 className="font-medium text-blue-900 mb-2">UUID Versions</h3>
                            <div className="text-sm text-blue-800 space-y-1">
                                <div><strong>v1:</strong> Timestamp-based (includes MAC address)</div>
                                <div><strong>v4:</strong> Random or pseudo-random (most common)</div>
                            </div>
                        </div>
                    </div>

                    {/* Validator */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">UUID Validator</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    UUID to validate
                                </label>
                                <input
                                    type="text"
                                    value={validateInput}
                                    onChange={(e) => setValidateInput(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-md font-mono focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter UUID to validate..."
                                />
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => validateUuid(validateInput)}
                                    className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
                                    disabled={!validateInput.trim()}
                                >
                                    Validate UUID
                                </button>
                                <button
                                    onClick={clearValidation}
                                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                                >
                                    Clear
                                </button>
                            </div>

                            {validationResult && (
                                <div className={`p-4 rounded-md ${validationResult.isValid
                                    ? 'bg-green-50 border border-green-200'
                                    : 'bg-red-50 border border-red-200'
                                    }`}>
                                    {validationResult.isValid ? (
                                        <div>
                                            <div className="flex items-center mb-3">
                                                <span className="text-green-600 mr-2">✓</span>
                                                <span className="font-medium text-green-800">Valid UUID</span>
                                            </div>

                                            <div className="space-y-2 text-sm">
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <span className="font-medium text-green-700">Version:</span>
                                                        <span className="ml-2 text-green-800">{validationResult.version}</span>
                                                    </div>
                                                    <div>
                                                        <span className="font-medium text-green-700">Variant:</span>
                                                        <span className="ml-2 text-green-800">{validationResult.variant}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex items-center">
                                            <span className="text-red-600 mr-2">✗</span>
                                            <span className="font-medium text-red-800">Invalid UUID format</span>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Format Information */}
                        <div className="mt-6 p-4 bg-gray-50 rounded-md">
                            <h3 className="font-medium text-gray-900 mb-2">UUID Format</h3>
                            <div className="text-sm text-gray-600 space-y-1">
                                <div>Format: <code className="bg-white px-1 rounded">xxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx</code></div>
                                <div>M = Version (1-5)</div>
                                <div>N = Variant (8, 9, A, B for RFC 4122)</div>
                                <div>Length: 36 characters (32 hex + 4 hyphens)</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Examples */}
                <div className="mt-6 bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Examples</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="font-medium text-gray-700 mb-2">UUID v4 (Random)</h4>
                            <code className="block bg-gray-50 p-3 rounded text-sm font-mono">
                                f47ac10b-58cc-4372-a567-0e02b2c3d479
                            </code>
                        </div>
                        <div>
                            <h4 className="font-medium text-gray-700 mb-2">UUID v1 (Timestamp)</h4>
                            <code className="block bg-gray-50 p-3 rounded text-sm font-mono">
                                6ba7b810-9dad-11d1-80b4-00c04fd430c8
                            </code>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UuidGenerator;
