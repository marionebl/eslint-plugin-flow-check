import {readFileSync as read} from 'fs';
import path from 'path';
import parseFlowConfig from 'flow-config-parser';
import getProjectRoot from './get-project-root';

export default getFlowConfig;

function getFlowConfig(cwd) {
	const projectRoot = getProjectRoot(cwd);

	if (!projectRoot) {
		return null;
	}

	const configFilePath = path.join(projectRoot, '.flowconfig');

	let config;

	try {
		const configFile = read(configFilePath, 'utf-8');
		config = parseFlowConfig(configFile);
	} catch (err) {
		err.fileName = configFilePath;
		return [err];
	}

	const [all] = config.get('all') || false;

	const include = config.get('include')
		.map(item => item.replace('<PROJECT_ROOT>', projectRoot));

	const ignore = config.get('ignore')
		.map(item => item.toString())
		.map(item => item.substr(1, item.length - 2))
		.map(item => item.replace(/\\/g, ''))
		.map(item => item.replace(/\.\*/g, '**'))
		.map(item => item.replace('<PROJECT_ROOT>', projectRoot));

	return [null, {
		all: all === 'true',
		include,
		ignore
	}];
}
