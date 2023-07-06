import React, { useState, useEffect } from "react";
import "./ProjectForm.css";
import { API } from "./api.tsx";
import { Project, User_Project } from "./Classes/entity_class.tsx";
import { useLocation, useNavigate } from "react-router-dom";

const ProjectForm = () => {
  const {state} = useLocation();
  const [formData, setFormData] = useState({
    id: state.projectId,
    name: "",
    intro: "",
    status: "0",
    owner: "",
    startDateTime: "",
    endDateTime: "",
  });

  const [projectMembers, setProjectMembers] = useState([]);
  const [allMembers, setAllMembers] = useState([]);
  
  let u = JSON.parse(localStorage.getItem("User"));


  useEffect(() => {
    // Simulating API call to fetch members from the database
    const fetchMembers = async () => {
      try {
        // Replace with your API endpoint to fetch members
        API.getAllUser().then((r) => {
          setAllMembers(r.data);
          console.log(r.data);
        });
      } catch (error) {
        console.log("Error fetching members:", error);
      }
    };
    setFormData({ ...formData, owner: u});
   
    fetchMembers();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
 
  };

  const handleMemberChange = (e, index) => {
    const updatedMembers = [...projectMembers];
    updatedMembers[index] = e.target.value;
    setProjectMembers(updatedMembers); 
  };

  const handleAddMember = () => {
    if (projectMembers.length < 5) {
    
      setProjectMembers([...projectMembers, ""]);
    }
  };

  const handleSubmit = (e) => {
    
    e.preventDefault();
    //Need to write edit api
    API.updateProject(formData).then((r) => {
      console.log(r.data);
    });
    console.log(formData);
    //console.log(projectMembers);
  };

  return (
    <div className="project-container">
      <form className="project-form" onSubmit={handleSubmit}>
        <h2>Edit Project</h2>
        <div className="form-group">
          <label htmlFor="name">Project Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="intro">Project Introduction:</label>
          <textarea
            id="intro"
            name="intro"
            value={formData.intro}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="status">Project Status:</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="0">Pre</option>
            <option value="1">Start</option>
            <option value="2">End</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="startDateTime">Start Date Time:</label>
          <input
            type="date"
            id="startDateTime"
            name="startDateTime"
            value={formData.startDateTime}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="endDateTime">End Date Time:</label>
          <input
            type="date"
            id="endDateTime"
            name="endDateTime"
            value={formData.endDateTime}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Edit Project</button>
      </form>
    </div>
  );
};

export default ProjectForm;
