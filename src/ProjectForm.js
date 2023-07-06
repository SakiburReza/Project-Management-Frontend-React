import React, { useState, useEffect } from "react";
import "./ProjectForm.css";
import { API } from "./api.tsx";
import { Project, User_Project } from "./Classes/entity_class.tsx";
import CheckboxList from "./List";

const ProjectForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    intro: "",
    status: "0",
    owner: "",
    startDateTime: "",
    endDateTime: "",
  });

  const [projectMembers, setProjectMembers] = useState([]);
  const [allMembers, setAllMembers] = useState([]);
  const [user_project, setUserProject] = useState({
    user: "",
    project: "",
  });
  let u = JSON.parse(localStorage.getItem("User"));
  // const [project, setProject] = useState<Project>("");

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
    setFormData({ ...formData, owner: u });
    // setProject({...project, owner: u});
    fetchMembers();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    /* setProject({
      ...formData,
      [e.target.name]: e.target.value
    }); */
  };

  const handleMemberChange = (e, index) => {
    const updatedMembers = [...projectMembers];
    updatedMembers[index] = e.target.value;
   // console.log("ww: ",alert(JSON.stringify(e.target.value)))
  /*
    setUserProject({ ...user_project, user : { id: e.target.value}  });
    console.log("up: ",{ ...user_project, user : { id: e.target.value}})
    API.addProjectMember({ ...user_project, user : { id: e.target.value}}).then(
      (r) => {
        console.log(r.data);
      }
    ); */
   // API.addProjectMember(e.target.value)
    
    setProjectMembers(updatedMembers); 
  };

  const handleAddMember = () => {
    if (projectMembers.length < 5) {
    
      setProjectMembers([...projectMembers, ""]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    API.createProject(formData).then((r) => {
      console.log(r.data);
      setUserProject({ ...user_project, project: r.data });
    });
    console.log(formData);
    //console.log(projectMembers);
  };

  return (
    <div className="project-container">
      <form className="project-form" onSubmit={handleSubmit}>
        <h2>Create Project</h2>
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
        <button type="submit">Create Project</button>
      </form>
      <div>
        <CheckboxList />
      </div>
    </div>
  );
};

export default ProjectForm;
