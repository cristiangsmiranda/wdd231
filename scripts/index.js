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
    // Limpa o conteúdo anterior
    courseDetails.innerHTML = '';
    // Cria o HTML com os detalhes do curso
    const detailsHTML = `
        <h2>${course.title}</h2>
        <p><strong>Subject:</strong> ${course.subject}</p>
        <p><strong>Number:</strong> ${course.number}</p>
        <p><strong>Credits:</strong> ${course.credits}</p>
        <p><strong>Certificate:</strong> ${course.certificate}</p>
        <p><strong>Description:</strong> ${course.description}</p>
        <p><strong>Technologies:</strong> ${course.technology.join(', ')}</p>
        <p><strong>Completed:</strong> ${course.completed ? 'Yes' : 'No'}</p>
    `;
    // Insere o HTML no container de detalhes
    courseDetails.innerHTML = detailsHTML;
}
// Função para buscar o curso com base no número
function findCourseByNumber(number) {
    return courses.find(course => course.number === number);
}
// Adiciona eventos de clique nas divs fixas para mostrar os detalhes
document.querySelectorAll('.course').forEach(courseDiv => {
    courseDiv.addEventListener('click', () => {
        const courseNumber = parseInt(courseDiv.id.split('-')[1]); // Extrai o número do curso a partir do ID
        const course = findCourseByNumber(courseNumber); // Busca o curso correspondente
        displayCourseDetails(course); // Exibe os detalhes do curso
    });
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


const hamButton = document.querySelector("#menu");
const navigation = document.querySelector("nav.navigation-home");
hamButton.addEventListener("click", () => {
    navigation.classList.toggle("open");
    hamButton.classList.toggle("open");
    if (navigation.classList.contains("open")) {
        const firstLink = navigation.querySelector("a");
        if (firstLink) {
            firstLink.focus();
        }
    }
});


document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = "Last Update: " + document.lastModified;
