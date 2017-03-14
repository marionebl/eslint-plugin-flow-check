import {spawnSync} from 'child_process';
import path from 'path';
import bin from 'flow-bin';

export default flow;

function flow(options) {
	const result = spawnSync(bin, [
		'check-contents',
		'--json',
		`--root=${options.root}`,
		options.fileName
	], {
		input: options.source,
		encoding: 'utf-8'
	});

	if (result.status !== 0) {
		return [{
			message: result.stderr,
			loc: {
				start: {
					line: 1
				},
				end: {
					line: 1
				}
			}
		}];
	}

	const {errors} = JSON.parse(result.stdout);

	return errors.map(error => {
		const [leading, ...rest] = error.message;
		const payload = rest.map(m => format(m, {
			root: options.root
		}));

		return {
			message: [leading.descr, ...payload].join(': '),
			path: leading.path,
			start: leading.loc.start.line,
			end: leading.loc.end.line,
			loc: leading.loc
		};
	});
}

function format(message, options) {
	if (message.type === 'Comment') {
		return message.descr;
	}
	if (message.type === 'Blame') {
		const address = message.path ?
			`${path.relative(options.root, message.path)}:${message.line}` :
			message.line;

		const see = message.path ? `See ${address}` : `See line ${address}`;
		return [`'${message.descr}'`, see].join('. ');
	}
	return `'${message.descr}'`;
}
