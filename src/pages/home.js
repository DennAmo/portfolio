import Works from "../components/Works";
import Form from "../components/Form";
import projectsData from "../data/projects.json";
import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [projects, setProjects] = useState([projectsData]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("/projects");
        setProjects(response.data);
      } catch (err) {
        console.error("Error fetching projects:", err);
      }
    };
    fetchProjects();
  }, []);

  const addProject = async (project) => {
    try {
      await axios.post("/add-project", project);
      setProjects((prevProjects) => [...prevProjects, project]);
    } catch (error) {
      console.error("Error adding project:", error);
    }
  };

  return (
    <div className="main">
      <Form addProject={addProject} />
      <Works projects={projects} />
    </div>
  );
};

export default Home;
