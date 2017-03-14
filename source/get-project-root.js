import path from 'path';
import {sync as find} from 'find-up';

export default getProjectRoot;

function getProjectRoot(cwd) {
	return path.dirname(find('.flowconfig', {cwd}));
}
