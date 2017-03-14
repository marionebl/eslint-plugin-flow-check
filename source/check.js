import {dirname} from 'path';
import flow from './flow';
import getFlowConfig from './get-flow-config';
import getProjectRoot from './get-project-root';
import match from './match';

export default check;

function check(source, options) {
	const cwd = dirname(options.fileName);
	const projectRoot = getProjectRoot(cwd);
	const [err, config] = getFlowConfig(cwd);

	if (err) {
		return [err, []];
	}

	if (!config) {
		return [null, []];
	}

	const matches = match(options.fileName, config, options.pragma);

	if (!matches) {
		return [null, []];
	}

	const reports = flow({
		root: projectRoot,
		source,
		fileName: options.fileName
	});

	return [null, reports];
}
