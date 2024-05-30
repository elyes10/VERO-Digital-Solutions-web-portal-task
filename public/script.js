document.addEventListener('DOMContentLoaded', () => {
    let data = [];

    const tableBody = document.getElementById('tableBody');
    const modal = document.getElementById('myModal');
    const span = document.getElementsByClassName('close')[0];
    const imageInput = document.getElementById('imageInput');
    const imageDisplay = document.getElementById('imageDisplay');

    function fetchData() {
        fetch('../server/fetch_data.php')
            .then(response => response.json())
            .then(newData => {
                data = newData;
                populateTable(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    function populateTable(data) {
        tableBody.innerHTML = '';
        data.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.task}</td>
                <td>${item.title}</td>
                <td>${item.description}</td>
                <td style="background-color: ${item.colorCode};">${item.colorCode}</td>
            `;
            tableBody.appendChild(row);
        });
    }

    function filterTable() {
        const searchValue = document.getElementById('search').value.toLowerCase();
        const filteredData = data.filter(item =>
            item.task.toLowerCase().includes(searchValue) ||
            item.title.toLowerCase().includes(searchValue) ||
            item.description.toLowerCase().includes(searchValue) ||
            item.colorCode.toLowerCase().includes(searchValue)
        );
        populateTable(filteredData);
    }


    window.filterTable = filterTable;

    document.getElementById('openModal').onclick = () => {
        modal.style.display = 'block';
    };

    span.onclick = () => {
        modal.style.display = 'none';
    };

    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };

    imageInput.onchange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            imageDisplay.src = e.target.result;
            imageDisplay.style.display = 'block';
        };
        reader.readAsDataURL(file);
    };

    setInterval(fetchData, 3600000); // Fetch data every 60 minutes
    fetchData();
});
