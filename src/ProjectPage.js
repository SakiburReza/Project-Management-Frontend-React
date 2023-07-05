import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProjectPage.css'; // Import custom CSS for styling
import {API} from "./api.tsx";
import { useNavigate } from 'react-router-dom';
import { PDFDownloadLink } from '@react-pdf/renderer';


function get_Date(strDate) {
 
    var date = new Date(strDate);
   
    var day = date.getDate();
    var month = date.getMonth()+1;
    var year = date.getFullYear();

    var str = day + "-" + month + "-" + year;
    return str;
  }


const ProjectPage = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [startDateFilter, setStartDateFilter] = useState('');
  const [endDateFilter, setEndDateFilter] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch projects from the database
    API.getAllProject()
      .then(response => {
        setProjects(response.data);
        setFilteredProjects(response.data);
        console.log("test: ",response.data)
      })
      .catch(error => {
        console.error('Error fetching projects:', error.response.data);
      });
  }, [filteredProjects]);

 

  const handleStartDateChange = event => {
    setStartDateFilter(event.target.value);
    filterProjects(event.target.value, endDateFilter);
  };

  const handleEndDateChange = event => {
    setEndDateFilter(event.target.value);
    filterProjects(startDateFilter, event.target.value);
  };

  const filterProjects = (startDate, endDate) => {
    const filtered = projects.filter(project => {
      if (!startDate && !endDate) {
        return true;
      }

      if (startDate && endDate) {
        return (
          project.startDate >= startDate &&
          project.endDate <= endDate
        );
      }

      if (startDate) {
        return project.startDate >= startDate;
      }

      if (endDate) {
        return project.endDate <= endDate;
      }

      return false;
    });

    setFilteredProjects(filtered);
  };

  const handleEditProject = projectId => {
     navigate("/edit-project", {state: {projectId}})
  };

  const handleDeleteProject = projectId => {
       API.deleteProjectById(projectId)
  };

  const handleViewProject = projectId => {
      console.log(projectId)
      navigate("/project-details",{ state: { projectId } })
  };
  const handleCreateProject = projectId => {
       navigate("/create-project")
  };

  const handleCreateJasperReport = projectId => {
    // Handle create Jasper report logic
  };

  return (
    <div className="project-page">
      <h1>Project List</h1>
      <div className="filter-container">
        <label>Start Date:</label>
        <input type="date" value={startDateFilter} onChange={handleStartDateChange} />
        <label>End Date:</label>
        <input type="date" value={endDateFilter} onChange={handleEndDateChange} />
      </div>
      <table>
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProjects.map(project => (
            <tr key={project.id}>
              <td>{project.name}</td>
              <td>{get_Date(project?.startDateTime)}</td>
              <td>{get_Date(project?.endDateTime)}</td>
              <td>
                <button className="action-btn edit-btn" onClick={() => handleEditProject(project.id)}>Edit project</button>
                <button className="action-btn delete-btn" onClick={() => handleDeleteProject(project.id)}>Delete Project</button>
                <button className="action-btn view-btn" onClick={() => handleViewProject(project.id)}>View Project</button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button className="action-btn view-btn" onClick={() => handleCreateProject()}>Create Project</button>
        <button className="action-btn view-btn">Create Jasper Report</button>
      </div>
    </div>
  );
};

export default ProjectPage;
