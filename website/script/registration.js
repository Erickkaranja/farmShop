// JavaScript to generate day options
document.addEventListener('DOMContentLoaded', () => {
    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.getMonth(); // January is 0, February is 1, etc.
    const currentYear = today.getFullYear();

    const daySelect = document.getElementById('day');
    for (let i = 1; i <= 31; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        daySelect.appendChild(option);
    }
    daySelect.value = currentDay;
    const monthSelect = document.getElementById('month');
    monthSelect.selectedIndex = currentMonth;

    const yearSelect = document.getElementById('year');
    for (let i = currentYear ; i >= 1930 ; i--){
      const option = document.createElement('option');
      option.value = i;
      option.textContent = i;
      yearSelect.appendChild(option);  
    }
});

