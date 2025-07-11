export const initChart = (selector) => {
	const chartEl = document.querySelector(selector);
	if (!chartEl) throw new Error(`Container not found: ${selector}`);

	// Ensure responsive container
	chartEl.classList.add('chart-container');
	chartEl.style.position = 'relative';

	chartEl.innerHTML =
		'<div class="bars"></div>' +
		'<div class="threshold min"><div class="value-label"></div></div>' +
		'<div class="threshold max"><div class="value-label"></div></div>' +
		'<div class="threshold avg"><div class="value-label"></div></div>';

	return {
		chart:   chartEl,
		barsEl:  chartEl.querySelector('.bars'),
		minLine: chartEl.querySelector('.threshold.min'),
		maxLine: chartEl.querySelector('.threshold.max'),
		avgLine: chartEl.querySelector('.threshold.avg')
	};
};