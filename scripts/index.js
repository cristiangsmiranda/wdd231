const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
]

// Seletor do container onde os detalhes do curso serão exibidos
const courseDetails = document.getElementById('course-details');
// Função para renderizar os detalhes de um curso
function displayCourseDetails(course) {
    courseDetails.innerHTML = '';
    courseDetails.innerHTML = `
      <div class="dialog-header">
        <h2>${course.subject} ${course.number}</h2>
        <button id="closeModal">❌</button>
      </div>
      <h3>${course.title}</h3>
      <p><strong>Credits</strong>: ${course.credits}</p>
      <p><strong>Certificate</strong>: ${course.certificate}</p>
      <p>${course.description}</p>
      <p><strong>Technologies</strong>: ${course.technology.join(', ')}</p>
    `;
    courseDetails.showModal();

    const closeModal = document.getElementById("closeModal");
    closeModal.addEventListener("click", () => {
        console.log("Fechando o modal...");
        courseDetails.close();
        // Limpa o conteúdo após fechar
        courseDetails.innerHTML = '';
    });

    courseDetails.addEventListener("click", (event) => {
        if (event.target === courseDetails) {
            console.log("Clicou fora do modal, fechando...");
            courseDetails.close();
            // Limpa o conteúdo após fechar
            courseDetails.innerHTML = '';
        }
    });
}

// Adiciona evento de clique aos cursos
document.querySelectorAll('.course').forEach(courseDiv => {
    courseDiv.addEventListener('click', () => {
        const courseNumber = parseInt(courseDiv.id.split('-')[1]);
        const course = findCourseByNumber(courseNumber);
        displayCourseDetails(course);
    });
});

// Função para buscar o curso com base no número
function findCourseByNumber(number) {
    return courses.find(course => course.number === number);
}

document.querySelectorAll('.navigation-home a').forEach(link => {
    // Verifica se o href do link é igual ao URL da página atual
    if (link.href === window.location.href) {
        link.classList.add('active'); // Adiciona a classe active ao link correspondente
    }
});

// Seletor do container de cursos
const coursesContainer = document.querySelector('.courses');
// Função para renderizar os cursos com base na categoria
function renderFilteredCourses(category) {
    coursesContainer.innerHTML = '';
    // Filtra os cursos com base na categoria escolhida
    const filteredCourses = courses.filter(course => {
        return category === 'all' || course.subject.toLowerCase() === category;
    });

    // Renderiza os cursos filtrados
    filteredCourses.forEach(course => {
        const courseDiv = document.createElement('div');
        courseDiv.classList.add('course');
        courseDiv.setAttribute('data-category', course.subject.toLowerCase());
        courseDiv.setAttribute('id', `course-${course.number}`);
        // Adiciona o conteúdo do curso
        courseDiv.textContent = `${course.subject} ${course.number} - ${course.title}`;
        if (course.completed) {
            courseDiv.classList.add('completed');
        } else {
            courseDiv.classList.add('not-completed'); // Adiciona uma classe para cursos não completos
        }
        // Insere no container de cursos
        coursesContainer.appendChild(courseDiv);
        // Adiciona o evento de clique para exibir os detalhes
        courseDiv.addEventListener('click', () => {
            displayCourseDetails(course);
        });
    });
}
// Função para filtrar os cursos ao clicar nos botões de categoria
document.querySelectorAll('.btn-filter').forEach(button => {
    button.addEventListener('click', () => {
        const category = button.id; // O ID do botão é 'all', 'cse', ou 'wdd'
        renderFilteredCourses(category);
    });
});
// Renderiza todos os cursos por padrão ao carregar a página
renderFilteredCourses('all');

function calculateTotalCredits() {
    const totalCredits = courses.reduce((accumulator, course) => {
        // Se o curso estiver completo, soma os créditos
        return course.completed ? accumulator + course.credits : accumulator;
    }, 0);
    // Insere o total de créditos no elemento com id 'total-credits'
    document.getElementById('total-credits').textContent = totalCredits;
}
// Chama a função para calcular e exibir os créditos ao carregar a página
calculateTotalCredits();

document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = "Last Update: " + document.lastModified;
