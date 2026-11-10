const getAllProjectsWithOrg = async () => {
    const query = `
        SELECT 
            p.project_id,
            p.title,
            p.description,
            p.location,         -- 📍 Explicitly pulled for project.location in your grid
            p.date,             -- 📅 Explicitly pulled to feed your EJS Date() scriptlet
            o.name AS org_name  -- 🌟 Grabs 'name' from organization and aliases it to project.org_name
        FROM public.service_projects p
        JOIN public.organization o ON p.organization_id = o.organization_id;
    `;

    const result = await db.query(query);
    return result.rows;
}

// 🌟 Both functions exported safely inside a single block to prevent syntax collisions
export {getAllProjectsWithOrg }
