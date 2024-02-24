// Inicializa userDetails fuera del alcance de la función asíncrona
let userDetails = {};
const userTitle = document.getElementById('user_title');
const userName = document.getElementById('user_value');

(async function loadUserData() {
    const userImage = document.getElementById('user_image');

    try {
        const response = await fetch('https://randomuser.me/api/');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        const user = data.results[0];

        // Actualiza userDetails con los datos de la API
        userDetails = {
            name: `${user.name.first} ${user.name.last}`,
            email: `${user.email}`,
            birthday: formatDate(user.dob.date),
            location: `${user.location.street.number} ${user.location.street.name}`,
            phone: `${user.phone}`,
            password: `${user.login.password}`
        };

        // Actualiza la imagen y el nombre inicialmente
        userImage.src = user.picture.large;
        userTitle.textContent = `My nombre is`;
        userName.textContent = userDetails.name;

    } catch (error) {
        console.error('Error fetching user data:', error);
    }
})();

// Eventos de mouseover para cada ícono
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.values_list li').forEach(item => {
        item.addEventListener('mouseover', function () {
            const label = this.children[0].getAttribute('data-label');
            userTitle.textContent = `Mi ${label} es`;
            userName.textContent = userDetails[label];
        });
    });

    // Obtener el botón por su ID y agregar un event listener
    const refreshButton = document.getElementById('refreshButton');
    refreshButton.addEventListener('click', function () {
        window.location.reload(); // Esto recargará la página
    });
});

// Función para formatear la fecha
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

// Obtener el botón por su ID y agregar un event listener
const refreshButton = document.getElementById('refreshButton');
refreshButton.addEventListener('click', function () {
    window.location.reload(); // Esto recargará la página
});

