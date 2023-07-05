import React from 'react';
import './ProjectDetailsPage.css';
import { Project } from './Classes/entity_class';

const ProjectDetailsPage = ({ project }: {project: Project}) => {
    console.log("ke: ",project)
  //const { name, intro, owner, status, startDateTime, endDateTime, projectMembers } = project;

  const getStatusText = (status) => {
    switch (status) {
      case 0:
        return 'Pre';
      case 1:
        return 'Start';
      case 3:
        return 'End';
      default:
        return '';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    return formattedDate;
  };

  return (
    <div className="project-details">
      <h2 className="project-details__name">{project.name}</h2>
      <p className="project-details__intro">{project.intro}</p>
      <div className="project-details__info">
        <p className="project-details__info-item">Owner: {project?.owner?.username}</p>
        <p className="project-details__info-item">Status: {getStatusText(project.status)}</p>
        {project.startDateTime && (
          <p className="project-details__info-item">Start Date: {formatDate(project.startDateTime)}</p>
        )}
        <p className="project-details__info-item">End Date: {formatDate(project.endDateTime)}</p>
      </div>
      <h3 className="project-details__members-heading">Project Members:</h3>
     
    </div>
  );
};

export default ProjectDetailsPage;
