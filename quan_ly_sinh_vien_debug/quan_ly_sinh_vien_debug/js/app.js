
import { loadData } from "./data-loader.js";
import { renderStudentList } from "./student-list.js";
import { setupStudentModal } from "./student-modal.js";

async function init() {
    const loadingMessage = document.getElementById("loadingMessage");
    const errorMessage = document.getElementById("errorMessage");
    const searchInput = document.getElementById("searchInput");

    try {
        const { students, subjects, grades } = await loadData();

        console.log(students, subjects, grades)

        renderStudentList(students, subjects, grades);
        setupStudentModal(students, subjects, grades);

        searchInput.addEventListener("input", () => {
            const keyword = searchInput.value.trim().toLowerCase();

            const filteredStudents = students.filter(student =>
                student.id.toLowerCase().includes(keyword) ||
                student.name.toLowerCase().includes(keyword)
            );

            renderStudentList(filteredStudents, subjects, grades);
        });

        loadingMessage.hidden = true;
    } catch (error) {
        loadingMessage.hidden = true;
        errorMessage.hidden = false;
        errorMessage.textContent = error.message;
        console.error(error);
    }
}

init();
