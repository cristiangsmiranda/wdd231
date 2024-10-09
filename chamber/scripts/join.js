fetch('data/join.json')
    .then(response => response.json())
    .then(data => {
        const cards = document.querySelectorAll('.info-link');
        cards.forEach(card => {
            card.addEventListener('click', function(event) {
                event.preventDefault();
                const modalId = this.getAttribute('data-modal');
                const membership = data.memberships.find(m => m.id === modalId);
                if (membership) {
                    displayMembershipDetails(membership);
                }
            });
        });
    });

const membershipDetailsModal = document.getElementById('membership-details');

function displayMembershipDetails(membership) {
    membershipDetailsModal.querySelector('h2').innerText = membership.title;
    membershipDetailsModal.querySelector('h3').innerText = membership.description;
    membershipDetailsModal.querySelector('.cost').innerText = membership.cost;

    const benefitsList = membershipDetailsModal.querySelector('.additional-benefits');
    benefitsList.innerHTML = '';
    membership.additionalBenefits.forEach(benefit => {
        const li = document.createElement('li');
        li.textContent = benefit;
        benefitsList.appendChild(li);
    });

    membershipDetailsModal.showModal();

    const closeModalButton = document.getElementById('closeModal');
    closeModalButton.onclick = closeModalHandler;

    membershipDetailsModal.onclick = (event) => {
        if (event.target === membershipDetailsModal) {
            closeModalHandler();
        }
    };
}
// Função de fechamento do modal
function closeModalHandler() {
    membershipDetailsModal.close();
    membershipDetailsModal.querySelector('h2').innerText = '';
    membershipDetailsModal.querySelector('h3').innerText = '';
    membershipDetailsModal.querySelector('.cost').innerText = '';
    membershipDetailsModal.querySelector('.additional-benefits').innerHTML = '';
}

// Código para gerenciar a navegação e o número de visitas
document.addEventListener("DOMContentLoaded", () => {
    let currentPath = window.location.pathname;
    if (currentPath.startsWith('/')) {
        currentPath = currentPath.substring(1);
    }
    const navLinks = document.querySelectorAll('.navigation-home a');
    navLinks.forEach(link => {
        if (currentPath.endsWith(link.getAttribute('href'))) {
            link.classList.add('active');
            link.style.backgroundColor = 'white';
            link.style.color = 'black';
        }
    });

    document.getElementById("currentyear").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = "Last Modified: " + document.lastModified;
});

document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); // Previne o comportamento padrão de envio do formulário

    const firstName = document.getElementById('Firstname').value;
    const lastName = document.getElementById('Lastname').value;
    const email = document.getElementById('useremail').value;
    const mobile = document.getElementById('phone').value;
    const businessName = document.getElementById('orgName').value;
    const membershipLevel = document.getElementById('membership').value; 
    const currentDate = new Date().toISOString();

    localStorage.setItem('formData', JSON.stringify({
        firstName,
        lastName,
        email,
        mobile,
        businessName,
        membershipLevel, 
        currentDate
    }));

    window.location.href = 'thankyou.html';
});

document.addEventListener("DOMContentLoaded", function () {
    const card1 = document.getElementById('card1');
    const card2 = document.getElementById('card2');
    const card3 = document.getElementById('card3');
    const card4 = document.getElementById('card4');

    card1.style.animation = 'cardAnimation1 4s forwards';
    card2.style.animation = 'cardAnimation2 4s forwards';
    card3.style.animation = 'cardAnimation3 4s forwards';
    card4.style.animation = 'cardAnimation4 4s forwards';
});
