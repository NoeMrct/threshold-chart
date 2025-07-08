// Build base DOM and grab references
export function initChart(containerSelector) {
	const chart = document.querySelector(containerSelector);
	if (!chart) throw new Error(`Container not found: ${containerSelector}`);

	chart.classList.add('chart-container');
	chart.innerHTML = `
		<div class="bars"></div>
		<div class="threshold min"><div class="value-label"></div></div>
		<div class="threshold max"><div class="value-label"></div></div>
		<div class="threshold avg"><div class="value-label"></div></div>
	`;

	return {
		chart,
		barsEl: chart.querySelector('.bars'),
		minLine: chart.querySelector('.threshold.min'),
		maxLine: chart.querySelector('.threshold.max'),
		avgLine: chart.querySelector('.threshold.avg'),
	};
}
