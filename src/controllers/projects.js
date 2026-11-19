// Import any needed model functions
import { getAllProjects, getUpcomingProjects, getProjectDetails } from '../models/projects.js';
import { getCategoriesByProjectId } from '../models/categories.js';

// Controller 1: Show all projects page
// const showProjectsPage = async (req, res) => {
//     const projects = await getAllProjects();
//     const title = 'Service Projects';

//     res.render('projects', { title, projects });
// };  

// Controller 2: Show top 5 upcoming projects page
const showUpcomingProjectsPage = async (req, res) => {
    const number_of_projects = 5; // You can change this number to display more or fewer projects
    const upcomingProjects = await getUpcomingProjects(number_of_projects);
    const title = 'Upcoming Service Projects';

    res.render('upcoming-projects', { title, projects: upcomingProjects });
};

// Controller 3: Show single project details page includes the categories for that project.
const showProjectDetailsPage = async (req, res) => {
    const projectId = req.params.id;
    const projectDetails = await getProjectDetails(projectId);
    const categories = await getCategoriesByProjectId(projectId);
    const title = `Project Details - ${projectDetails.title}`;

    res.render('project-details', { title, project: projectDetails, categories });
};

// Export all controller functions for your router
export { showUpcomingProjectsPage, showProjectDetailsPage };