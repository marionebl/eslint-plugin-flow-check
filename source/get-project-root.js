import path from 'path';
import {sync as find} from 'find-up';

export default getProjectRoot;

function getProjectRoot(cwd) {
	const config = find('.flowconfig', {cwd});

	if (!config) {
		return config;
	}

	return path.dirname(config);
}
