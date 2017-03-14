import check from './check';

export default {
	rules: {
		check(context) {
			return {
				Program(node) {
					const fileName = context.getFilename();
					const fileSource = context.getSourceCode();

					const comments = node.comments.map(comment => {
						return comment.value.replace(/\*/g, '').trim();
					});

					const pragma = Boolean(comments.find(comment => comment.startsWith('@flow')));

					const [err, reports] = check(fileSource.text, {
						fileName,
						pragma
					});

					if (err) {
						context.report({
							loc: {
								start: {
									line: 1
								},
								end: {
									line: 1
								}
							},
							message: `Error: ${err.message} ${err.fileName}`
						});
						return;
					}

					reports.forEach(report => context.report(report));
				}
			};
		}
	}
};
