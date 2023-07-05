import React from 'react';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import SignUpForm from './SignUp';
import { Project } from './Classes/entity_class.tsx';
import ProjectDetailsPage from './ProjectDetailsPage.tsx';
import { API } from './api.tsx';


const ProjectDetailsLoader = () => {
    const [_project, setProject] = useState<Project>(new Project());

    const {state} = useLocation()
    
    useEffect(() => {
        
         
            console.log("pid: ",state.projectId)
            API.getProjectById(state.projectId).then((r)=>{
                console.log(r.data)
                setProject(r.data)
            }) 
          
          
        
      }, []);   
      console.log("pro: ",_project)
  return (
    <div>
      <ProjectDetailsPage project={_project} />
    </div>
  );  
 
};

export default ProjectDetailsLoader;
