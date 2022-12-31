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
import {
	setCurrentLessonId,
	setCurrentStatus,
} from "../../app/slices/appSlice";
import { useSubject } from "../../hooks/useSubject";
import SubjectLessonAdd from "./SubjectLessonAdd";
import { getLessonsForSubject } from "../../app/selectors/subjectsSelectors";
import {
	addNewLessonThunk,
	addSubjectMaterialThunk,
	addSubjectSkillPointThunk,
	editSubjectLessonThunk,
	setSubjectLessonStatusThunk,
} from "../../app/slices/subjectsThunks";
import SubjectMaterialAdd from "./SubjectMaterialAdd";

function SubjectCard({ currentSubjectId }) {
	const currentLessonId = useSelector((state) => state.app.currentLessonId);

	const [addNewLessonActive, setAddNewLessonActive] = useState(false);
	const [addNewMaterialActive, setAddNewMaterialActive] = useState(false);

	useEffect(() => {
		setAddNewLessonActive(false);
	}, [currentSubjectId]);

	const dispatch = useDispatch();

	const subject = useSubject(currentSubjectId);

	const subjectSkills = subject.skills;

	const subjectMaterials = subject.materials;

	const subjectLessons = useSelector((state) =>
		getLessonsForSubject(state, currentSubjectId)
	);

	const onEditClick = () => {
		dispatch(setCurrentStatus("edit"));
	};

	const onLessonComplete = (lessonId) => {
		dispatch(
			setSubjectLessonStatusThunk(currentSubjectId, lessonId, "completed")
		);
		dispatch(addSubjectSkillPointThunk(currentSubjectId, lessonId));
	};

	const onLessonFail = (lessonId) => {
		dispatch(setSubjectLessonStatusThunk(currentSubjectId, lessonId, "failed"));
	};

	const onAddNewLesson = () => {
		if (addNewLessonActive) {
			return;
		}
		setAddNewLessonActive(true);
		const newDate = new Date();
		const newLesson = {
			time: newDate.getTime() / 1000,
			topic: "Моё новое занятие",
			status: "waiting",
			skills: [],
		};
		dispatch(addNewLessonThunk(currentSubjectId, newLesson));
	};

	const onLessonSave = (lesson, lessonId) => {
		dispatch(editSubjectLessonThunk(currentSubjectId, lesson, lessonId));
		setAddNewLessonActive(false);
		dispatch(setCurrentLessonId(-1));
	};

	const onMaterialAdd = () => {
		if (addNewMaterialActive) {
			return;
		}
		setAddNewMaterialActive(true);
	};

	const onMaterialSave = (data) => {
		setAddNewMaterialActive(false);
		if (!data.length) {
			return;
		}
		dispatch(addSubjectMaterialThunk(currentSubjectId, data));
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
				</SubjectHeader>
				<SubjectDescription>{subject.description}</SubjectDescription>
				<SubjectContainer>
					<SubjectData title={"Мои навыки"}>
						<SubjectSkill
							name="Общий прогресс"
							color={subject.color}
							progress={subject.totalSkill}
						/>
						{Object.entries(subjectSkills).map((skill) => (
							<SubjectSkill
								key={skill[0]}
								name={skill[1].name.length ? skill[1].name : "Без названия"}
								color={skill[1].color}
								progress={skill[1].progress}
							/>
						))}
					</SubjectData>

					<SubjectData title={"Учебники и материалы"} addAction={onMaterialAdd}>
						{addNewMaterialActive === true ? (
							<SubjectMaterialAdd onSave={onMaterialSave} />
						) : null}
						{Object.entries(subjectMaterials).map((material) =>
							urlRegex.test(material[1]) ? (
								<SubjectMaterial as="a" key={material[0]} href={material[1]}>
									{material[1]}
								</SubjectMaterial>
							) : (
								<SubjectMaterial key={material[0]}>
									{material[1]}
								</SubjectMaterial>
							)
						)}
					</SubjectData>
					<SubjectData
						alignRight
						title={"Мои занятия"}
						addAction={onAddNewLesson}
					>
						{addNewLessonActive === false &&
							Object.entries(subjectLessons).map((lesson) =>
								lesson[1].status === "waiting" ? (
									<SubjectLesson
										key={lesson[0]}
										name={lesson[1].topic}
										lessonId={lesson[0]}
										skillsUsed={lesson[1].skills}
										skills={subjectSkills}
										onComplete={onLessonComplete}
										onFail={onLessonFail}
										time={new Date(lesson[1].time * 1000)}
									/>
								) : null
							)}
						{addNewLessonActive === true && currentLessonId !== -1 ? (
							<SubjectLessonAdd
								subjectId={currentSubjectId}
								lessonId={currentLessonId}
								availableSkills={subjectSkills}
								onSave={onLessonSave}
							/>
						) : null}
					</SubjectData>
					<SubjectData title={"Прошлые занятия"} expand={false}>
						{!addNewLessonActive &&
							Object.entries(subjectLessons).map((lesson) =>
								lesson[1].status === "completed" ? (
									<SubjectLesson
										key={lesson[0]}
										name={lesson[1].topic}
										lessonId={lesson[0]}
										skillsUsed={lesson[1].skills}
										skills={subjectSkills}
										time={new Date(lesson[1].time * 1000)}
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
