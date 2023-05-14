import type { ParamMatcher } from '@sveltejs/kit';

/* eslint-disable no-useless-escape */
export const match: ParamMatcher = (param) => {
	return /^[a-z\d\(\)]+(?:-[a-z\d\(\)]+)*$/.test(param);
};
