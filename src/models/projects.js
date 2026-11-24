import db from './db.js'

/**
 * 1. Fetches raw project details
 */
const getAllProjects = async () => {
    const query = `
        SELECT project_id, organization_id, title, description, location, date
        FROM public.service_projects;
    `;

    const result = await db.query(query);
    return result.rows;
}


const getUpcomingProjects = async (number_of_projects) => {
    const query = `
        SELECT p.project_id,
            p.title,
            p.description,
            p.date,
            p.location,
            p.organization_id,
            o.name AS organization_name
        FROM service_projects p
        JOIN organization o ON p.organization_id = o.organization_id
        WHERE p.date >= CURRENT_DATE
        ORDER BY p.date ASC
        LIMIT $1;
    `;

    const result = await db.query(query, [number_of_projects]);
    return result.rows; // Returns array of project objects
}

const getProjectDetails = async (id) => {
    const query = `
        SELECT p.project_id,
            p.title,
            p.description,
            p.date,
            p.location,
            p.organization_id,
            o.name AS organization_name
        FROM service_projects p
        JOIN organization o ON p.organization_id = o.organization_id
        WHERE p.project_id = $1
        ORDER BY p.date ASC
        LIMIT $1;
    `;

    const result = await db.query(query, [id]);
    return result.rows[0]; // Returns single project object
}

const getProjectsByOrganizationId = async (organizationId) => {
    const query = `
        SELECT p.project_id,
            p.title,
            p.description,
            p.date,
            p.location,
            p.organization_id,
            o.name AS organization_name
        FROM service_projects p
        JOIN organization o ON p.organization_id = o.organization_id
        WHERE p.organization_id = $1
        ORDER BY p.date ASC;
    `;

    const result = await db.query(query, [organizationId]);
    return result.rows;
};


export { getAllProjects, getUpcomingProjects, getProjectDetails, getProjectsByOrganizationId };