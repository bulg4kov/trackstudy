import React, { useEffect, useState } from "react";
import ButtonBasic from "../UI/Buttons/ButtonBasic";
import SubjectSkill from "./SubjectSkill";
import SubjectData from "./SubjectData";
import SubjectLesson from "./SubjectLesson";
import { urlRegex } from "../../utils/urlRegex";
import {
	Subject,
	SubjectColor,
	SubjectContainer,
	SubjectDescription,
	SubjectHeader,
	SubjectMaterial,
	SubjectTitle,
} from "./SubjectStyled";
import { useDispatch, useSelector } from "react-redux";
import { changeCurrentStatus } from "../../app/slices/appSlice";
import { useSubject } from "../../hooks/useSubject";
import {
	addNewLesson,
	addSubjectSkillPointThunk,
	editSubject,
	editSubjectLesson,
	removeSubjectById,
} from "../../app/slices/subjectsSlice";
import SubjectLessonAdd from "./SubjectLessonAdd";
import { getLessonsForSubject } from "../../app/selectors/subjectsSelectors";

function SubjectCard({ currentSubjectId }) {
	const [addNewLessonActive, setAddNewLessonActive] = useState(false);
	const [currentLesson, setCurrentLesson] = useState(undefined);

	useEffect(() => {
		setAddNewLessonActive(false);
		setCurrentLesson(undefined);
	}, [currentSubjectId]);

	const dispatch = useDispatch();

	const subject = useSubject(currentSubjectId);

	const subjectLessons = useSelector((state) =>
		getLessonsForSubject(state, subject.id)
	);

	const onEditClick = () => {
		dispatch(changeCurrentStatus("edit"));
	};

	const onLessonComplete = (lessonId) => {
		const newLessons = JSON.parse(JSON.stringify(subject.lessons));
		const targetLessonId = newLessons.findIndex(
			(lesson) => lesson.id === lessonId
		);
		const targetLesson = newLessons[targetLessonId];
		const targetSkillsIds = targetLesson.skills;
		targetLesson.status = "completed";
		dispatch(editSubject({ ...subject, lessons: newLessons }));
		dispatch(addSubjectSkillPointThunk(currentSubjectId, targetSkillsIds));
	};

	const onLessonFail = (lessonId) => {
		const newLessons = JSON.parse(JSON.stringify(subject.lessons));
		const targetLessonId = newLessons.findIndex(
			(lesson) => lesson.id === lessonId
		);
		const targetLesson = newLessons[targetLessonId];
		targetLesson.status = "fail";
		dispatch(editSubject({ ...subject, lessons: newLessons }));
	};

	const onAddNewLesson = () => {
		setAddNewLessonActive(true);
		const newDate = new Date();
		const newLesson = {
			id: subject.lessons.length + 1,
			time: newDate.getTime() / 1000,
			topic: "Моё новое занятие",
			status: "waiting",
			skills: [],
		};
		dispatch(addNewLesson(subject.id, newLesson));
		setCurrentLesson(newLesson);
	};

	const onLessonSave = (newLesson) => {
		dispatch(editSubjectLesson(subject.id, newLesson));
		setAddNewLessonActive(false);
		setCurrentLesson(undefined);
	};

	const onRemoveSubject = () => {
		dispatch(removeSubjectById(subject.id));
	};

	return (
		<section>
			<Subject>
				<SubjectHeader>
					<SubjectTitle>
						<h3 className="TabTitle">{subject.name}</h3>
						<SubjectColor color={subject.color}>
							цвет: <div></div>
						</SubjectColor>
					</SubjectTitle>
					<ButtonBasic title="Редактировать" callback={onEditClick} />
					<ButtonBasic title="Удалить" callback={onRemoveSubject} />
				</SubjectHeader>
				<SubjectDescription>{subject.description}</SubjectDescription>
				<SubjectContainer>
					<SubjectData title={"Мои навыки"}>
						<SubjectSkill
							name="Общий прогресс"
							color={subject.color}
							progress={subject.totalSkill}
						/>
						{subject.skills.map((skill) => (
							<SubjectSkill
								key={skill.id}
								name={skill.name}
								color={skill.color}
								progress={skill.progress}
							/>
						))}
					</SubjectData>

					<SubjectData
						title={"Учебники и материалы"}
						addAction={function () {}}
					>
						{subject.materials.map((material, index) =>
							urlRegex.test(material) ? (
								<SubjectMaterial as="a" key={index} href={material}>
									{material}
								</SubjectMaterial>
							) : (
								<SubjectMaterial key={index}>{material}</SubjectMaterial>
							)
						)}
					</SubjectData>
					<SubjectData
						alignRight
						title={"Мои занятия"}
						addAction={onAddNewLesson}
					>
						{addNewLessonActive === false &&
							subjectLessons.map((lesson) =>
								lesson.status === "waiting" ? (
									<SubjectLesson
										key={lesson.id}
										name={lesson.topic}
										lessonId={lesson.id}
										skillsUsed={lesson.skills}
										skills={subject.skills}
										onComplete={onLessonComplete}
										onFail={onLessonFail}
										time={new Date(lesson.time * 1000)}
									/>
								) : null
							)}
						{addNewLessonActive === true && currentLesson !== undefined ? (
							<SubjectLessonAdd
								initData={currentLesson}
								availableSkills={subject.skills}
								onSave={onLessonSave}
							/>
						) : null}
					</SubjectData>
					<SubjectData title={"Прошлые занятия"} expand={false}>
						{!addNewLessonActive &&
							subjectLessons.map((lesson) =>
								lesson.status === "completed" ? (
									<SubjectLesson
										key={lesson.id}
										name={lesson.topic}
										lessonId={lesson.id}
										skillsUsed={lesson.skills}
										skills={subject.skills}
										time={new Date(lesson.time * 1000)}
									/>
								) : null
							)}
					</SubjectData>
				</SubjectContainer>
			</Subject>
		</section>
	);
}

export default SubjectCard;
