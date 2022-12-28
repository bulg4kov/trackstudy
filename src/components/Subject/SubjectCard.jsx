import React from "react";
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

function SubjectCard({ currentSubjectId }) {
	const dispatch = useDispatch();

	const subject = useSelector((state) => state.subjects[currentSubjectId]);

	const onEditClick = () => {
		dispatch(changeCurrentStatus("edit"));
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
						addAction={function () {}}
					>
						{subject.lessons.map((lesson) =>
							lesson.status === "waiting" ? (
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
