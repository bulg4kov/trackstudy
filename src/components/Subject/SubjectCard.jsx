import React from "react";
import styled from "styled-components";
import ButtonBasic from "../UI/Buttons/ButtonBasic";
import SubjectSkill from "./SubjectSkill";
import SubjectData from "./SubjectData";
import SubjectLesson from "./SubjectLesson";

const Subject = styled.article`
	display: flex;
	flex-direction: column;
	gap: 16px;
	width: 550px;
`;

const SubjectContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-template-rows: repeat(2, 1fr);
	grid-auto-flow: column;
	gap: 24px;
	justify-content: space-between;
`;

const SubjectHeader = styled.div`
	display: flex;
	gap: 32px;
	align-items: flex-start;
	flex-wrap: wrap;
`;

const SubjectTitle = styled.div`
	display: flex;
	flex-direction: column;
`;

const SubjectColor = styled.div`
	display: flex;
	align-items: center;
	gap: 4px;
	div {
		width: 9px;
		height: 9px;
		background-color: ${(props) => props.theme.cardPrimary[props.color]};
	}
`;

const SubjectDescription = styled.p`
	font-size: 16px;
	width: 450px;
`;

const SubjectMaterial = styled.span`
	font-size: 16px;
	font-weight: 400;
	color: ${(props) =>
		props.as === "a" ? props.theme.link : props.theme.textPrimary};
`;

const urlRegex =
	/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;
function SubjectCard({ subject, ...props }) {
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
					<ButtonBasic title="Редактировать" />
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
