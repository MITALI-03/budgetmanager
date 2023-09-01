import { useContext, useState, useEffect } from "react";
import Chart from "chart.js/auto";
import ExpenseContext from "../context/expenses/ExpenseContext";

function BudgetPieChart() {
  const context = useContext(ExpenseContext);
  const { gettotalRecord } = context;
  const [budgetData, setBudgetData] = useState([]);

  useEffect(() => {
    gettotalRecord()
      .then((data) => {
        setBudgetData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [gettotalRecord]);

  useEffect(() => {
    // Draw pie chart when budget data is available
    if (budgetData) {
      const chartData = {
        labels: ["Total Expenses", "Total Budget", "Extra Expenses"],
        datasets: [
          {
            data: [
              budgetData.totalExpense,
              budgetData.totalBudget,
              budgetData.extraExpenses,
            ],
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
            hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
          },
        ],
      };

      const canvas = document.getElementById("budget-pie-chart");

      // Get the existing chart instance, if any
      const existingChart = Chart.getChart(canvas);

      // Destroy the existing chart, if any
      if (existingChart) {
        existingChart.destroy();
      }

      // Create the new chart instance
      new Chart(canvas, {
        type: "pie",
        data: chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    }
  }, [budgetData]);

  return (
    <div>
      <h3>Budget Overview</h3>
      <div>
        <canvas id="budget-pie-chart"></canvas>
      </div>
    </div>
  );
}

export default BudgetPieChart;
