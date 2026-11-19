// Import any needed model functions
import { getAllCategories,getCategoryDetails } from '../models/categories.js';

// Define any controller functions
const showCategoriesPage = async (req, res) => {
    const categories = await getAllCategories();
    const title = 'Service Categories';

    res.render('categories', { title, categories });
};  

// Create a new controller function for the category details page.
const showCategoryDetailsPage = async (req, res) => {
    const categoryId = req.params.id;
    const categoryDetails = await getCategoryDetails(categoryId);
    const categoryName = categoryDetails[0]?.category_name || 'Unknown Category';
    const title = `Category Details - ${categoryName}`;

    res.render('category', { title, projects: categoryDetails, categoryName });
}




// Export any controller functions
export { showCategoriesPage, showCategoryDetailsPage };