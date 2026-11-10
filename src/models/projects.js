import db from './db.js'

/**
 * 1. Fetches raw project details (without organization context)
 */
const getAllProjects = async () => {
    const query = `
        SELECT project_id, organization_id, title, description, location, date
        FROM public.service_projects;
    `;

    const result = await db.query(query);
    return result.rows;
}


export { getAllProjects}
