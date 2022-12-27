const storage = window.localStorage;

export function getSubjects() {
	return JSON.parse(storage.getItem("subjects"));
}

export function setSubjects(subjects) {
	storage.setItem("subjects", JSON.stringify(subjects));
}
