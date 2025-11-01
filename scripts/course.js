document.getElementById('currentyear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = document.lastModified;


const menuButton = document.getElementById('menuButton');
const mainNav = document.getElementById('mainNav');

menuButton.addEventListener('click', () => {
  mainNav.classList.toggle('show');
});


const courses = [
  { code: "WDD130", name: "Web Fundamentals", credits: 3, type: "WDD", completed: true },
  { code: "CSE110", name: "Intro to Programming", credits: 2, type: "CSE", completed: true },
  { code: "WDD131", name: "Dynamic Web Fundamentals", credits: 3, type: "WDD", completed: false },
  { code: "WDD231", name: "Frontend Development I", credits: 3, type: "WDD", completed: false }
];

const container = document.getElementById('courseContainer');
const totalCredits = document.getElementById('totalCredits');

function displayCourses(list) {
  container.innerHTML = '';
  let total = 0;

  list.forEach(course => {
    const div = document.createElement('div');
    div.classList.add('course');
    if (course.completed) div.classList.add('completed');
    div.textContent = `${course.code}`;
    total += course.credits;
    container.appendChild(div);
  });

  totalCredits.textContent = total;
}

document.getElementById('allBtn').addEventListener('click', () => displayCourses(courses));
document.getElementById('cseBtn').addEventListener('click', () => displayCourses(courses.filter(c => c.type === 'CSE')));
document.getElementById('wddBtn').addEventListener('click', () => displayCourses(courses.filter(c => c.type === 'WDD')));

displayCourses(courses);
