export async function loadData() {
    const [studentsRes, subjectsRes, gradesRes] = await Promise.all([
        fetch("./data/students.json"),
        fetch("./data/subjects.json"),
        fetch("./data/grades.json")
    ]);

    if (!studentsRes.ok || !subjectsRes.ok || !gradesRes.ok) {
        throw new Error("Không tải được dữ liệu JSON");
    }

    const [students, subjects, grades] = await Promise.all([
        studentsRes.json(),
        subjectsRes.json(),
        gradesRes.json()
    ]);

    return { students, subjects, grades };
}
