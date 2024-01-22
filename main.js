const form = document.querySelector(".compound-form");
const calculator = document.querySelector(".calculator");
let results = document.querySelector(".results");

let compoundData = [];
let d = new Date();
let year = d.getFullYear();
let xLabels = [];

form.addEventListener("submit", (e) => {
  e.preventDefault();

  compoundData = [];
  xLabels = [];

  const principal = parseFloat(e.target.principal.value); // principal
  const interestRate = parseFloat(e.target.rate.value); // interest rate in percentage terms
  const periods = parseFloat(e.target.period.value); // number of compounding periods

  let ci;
  compoundData.push(principal);
  for (let x = 1; x < periods + 1; x++) {
    xLabels.push(x);
    ci = principal * (1 + interestRate / 100) ** x;
    compoundData.push(ci.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]);
  }

  const html = `
		<h2>Results</h2>
		<p class="results-text">
			Given the initial investment of <span class="highlight">${principal}</span>, 
			an interest rate of <span class="highlight">${interestRate}%</span> compounded for <span class="highlight">${periods}</span> periods, 
			the compound interest of your investment is: 
			<span class="ci-result-total">${new Intl.NumberFormat("hi-IN", {
        style: "currency",
        currency: "INR",
      }).format(compoundData[compoundData.length - 1])}₹</span>
		</p>
		<div class="chart-wrapper">
			<canvas id="chart"></canvas>
		</div>
	`;

  if (!results) {
    const resDiv = document.createElement("div");
    resDiv.className = "results";
    resDiv.innerHTML = html;

    calculator.appendChild(resDiv);
    results = document.querySelector(".results");
  } else {
    results.innerHTML = html;
  }

  const ctx = document.getElementById("chart").getContext("2d");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: xLabels,
      datasets: [
        {
          // fill: { target: "origin", above: "rgba(255, 255, 255, 0.38)" },
          label: "Future Value",
          data: compoundData,
          backgroundColor: "#3D7BE2",
          borderColor: "#3D7BE2",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        x: {
          ticks: {
            color: "rgba(255, 255, 255, 0.74)",
          },
          grid: {
            display: false,
            borderColor: "rgba(255, 255, 255, 0.12)",
          },
        },
        y: {
          beginAtZero: true,
          ticks: {
            // Include a euro sign in the ticks
            callback: function (value, index, values) {
              return "₹ " + value;
            },
            color: "rgba(255, 255, 255, 0.74)",
          },
          grid: {
            borderColor: "rgba(255, 255, 255, 0.12)",
            color: "rgba(255, 255, 255, 0.12)",
          },
        },
      },
    },
  });
});
