
const WEIGHTS = {
    attendance: 0.1,
    midterm: 0.3,
    final: 0.6
};

export function calculateSubjectAverage(scores) {
    const [attendance, midterm, final] = scores;

    return (
        attendance * WEIGHTS.attendance +
        midterm * WEIGHTS.midterm +
        final * WEIGHTS.final
    );
}

export function calculateStudentResult(grade, subjects) {
    const subjectResults = subjects.map(subject => {
        const scores = grade.scores[subject.id];

        return {
            subjectId: subject.id,
            subjectName: subject.name,
            scores,
            average: calculateSubjectAverage(scores)
        };
    });

    const average =
        subjectResults.reduce((sum, item) => sum + Math.round(item.average), 0) /
        subjectResults.length;

    const hasFailedSubject = subjectResults.some(
        item => item.average < 5
    );

    let classification;

    if (average >= 7) {
        classification = "Khá";
    } else if (average >= 8.5) {
        classification = "Giỏi";
    } else if (average >= 5) {
        classification = "Trung bình";
    } else {
        classification = "Yếu";
    }

    let scholarship = 0;

    if (!hasFailedSubject && average >= 8.5) {
        scholarship = 1500000;
    } else if (!hasFailedSubject && average >= 8) {
        scholarship = 1000000;
    }

    return {
        subjectResults,
        average,
        classification,
        scholarship
    };
}

export function formatCurrency(amount) {
    return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
        maximumFractionDigits: 0
    }).format(amount);
}
