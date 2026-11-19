import db from './db.js'

/**
 * 1. Fetches raw project details (without organization context)
 */
const getAllCategories = async () => {
    const query = `
        SELECT category_id, category_name
        FROM public.categories;
    `;

    const result = await db.query(query);
    return result.rows;
}

//Retrieve a single category by its ID.
const getCategoryById = async (id) => {
    const query = `
        SELECT category_id, category_name
        FROM public.categories
        WHERE category_id = $1;
    `;

    const result = await db.query(query, [id]);
    return result.rows[0]; // Returns single category object
}

//Retrieve all categories for a given service project.
const getCategoriesByProjectId = async (projectId) => {
    const query = `
        SELECT c.category_id, c.category_name
        FROM public.categories c
        JOIN public.service_projects_categories pc ON c.category_id = pc.category_id
        WHERE pc.project_id = $1;
    `;

    const result = await db.query(query, [projectId]);
    return result.rows; // Returns array of category objects
}

//Retrieve all service projects for a given category.
const getCategoryDetails = async (categoryId) => {
    const query = `
        SELECT 
            c.category_id,
            c.category_name,
            sp.*
        FROM public.categories c
        LEFT JOIN public.service_projects_categories spc 
            ON c.category_id = spc.category_id
        LEFT JOIN public.service_projects sp 
            ON spc.project_id = sp.project_id
        WHERE c.category_id = $1
        ORDER BY sp.project_id;
    `;
    const result = await db.query(query, [categoryId]);
    return result.rows;
};



export { getAllCategories, getCategoryById, getCategoriesByProjectId, getCategoryDetails };
