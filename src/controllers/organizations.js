// Import any needed model functions
import { getAllOrganizations, getOrganizationDetails } from '../models/organizations.js';
import { getProjectsByOrganizationId } from '../models/projects.js';

// Controller 1: Renders organizations.ejs (all partner organizations)
const showOrganizationsPage = async (req, res) => {
    const organizations = await getAllOrganizations();
    const title = 'Our Partner Organizations';

    res.render('organizations', { title, organizations });
};

// Controller 2: Renders organization-details.ejs (single organization + all projects led by it)
const showOrganizationDetailsPage = async (req, res) => {
    const organizationId = req.params.id;
    const organization = await getOrganizationDetails(organizationId);
    const projects = await getProjectsByOrganizationId(organizationId);
    const title = `Service Projects Led by ${organization.name}`;

    res.render('organization-details', { title, organization, projects });
};

export { showOrganizationsPage, showOrganizationDetailsPage };
