const storage = window.localStorage;

export function getSubjectsFromStorage() {
	return JSON.parse(storage.getItem("subjects"));
}

export function setSubjectsInStorage(subjects) {
	storage.setItem("subjects", JSON.stringify(subjects));
}
