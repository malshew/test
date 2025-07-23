
document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.tab');
  const tableContainer = document.getElementById('table-container');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      loadData(tab.dataset.type);
    });
  });

  loadData('popular');

  async function loadData(type) {
    const response = await fetch('data.json');
    const data = await response.json();
    renderTable(data[type]);
  }

  function renderTable(items) {
    let html = `
      <table class="rating-table">
        <thead>
          <tr>
            <th>Название</th>
            <th>Рейтинг</th>
            <th>Отзывы</th>
            <th>Бонус</th>
            <th>Ссылка</th>
          </tr>
        </thead>
        <tbody>
    `;

    items.forEach(item => {
      html += `
        <tr>
          <td><img src="${item.logo}" alt="${item.name}" height="30" /></td>
          <td><span class="stars">⭐ ${item.rating}</span></td>
          <td>${item.reviews} отзывов</td>
          <td>${item.bonus}</td>
          <td><a href="#" class="button">Сайт</a></td>
        </tr>
      `;
    });

    html += '</tbody></table>';
    tableContainer.innerHTML = html;
  }
});
