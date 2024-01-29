export const BINARY_ENCODING = 'base64';
export const WAIT_TIME_UNLIMITED = '3000-01-01T00:00:00.000Z';

export const LOG_LEVELS = ['silent', 'error', 'warn', 'info', 'debug', 'verbose'] as const;

export const CODE_LANGUAGES = ['javaScript', 'python'] as const;
export const CODE_EXECUTION_MODES = ['runOnceForAllItems', 'runOnceForEachItem'] as const;

/**
 * Nodes whose parameter values may refer to other nodes without expressions.
 * Their content may need to be updated when the referenced node is renamed.
 */
export const NODES_WITH_RENAMABLE_CONTENT = new Set([
	'snowbeam-nodes-base.code',
	'snowbeam-nodes-base.function',
	'snowbeam-nodes-base.functionItem',
]);

// Arbitrary value to represent an empty credential value
export const CREDENTIAL_EMPTY_VALUE =
	'__snowbeam_EMPTY_VALUE_8a1aa786-9732-0a09-2z2z-e08eb29e58da' as const;

export const FORM_TRIGGER_PATH_IDENTIFIER = 'snowbeam-form';
