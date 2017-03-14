import multimatch from 'multimatch';

export default function match(fileName, config, pragma) {
	const couldMatch = config.all || pragma;
	const included = couldMatch && (multimatch([fileName], config.include)).length === 1;

	if (!included) {
		return false;
	}

	const ignored = config.ignore.length > 0 ?
		(multimatch([fileName], config.ignore)).length > 0 :
		false;

	if (ignored) {
		return false;
	}

	return true;
}
