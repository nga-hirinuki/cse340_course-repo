-- service_projects Table
-- ========================================

CREATE TABLE service_projects (
    project_id INT PRIMARY KEY,
    organization_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    FOREIGN KEY (organization_id) REFERENCES organization(organization_id)
);

-- Insert 5 sample service projects for each organization (15 projects total)
INSERT INTO service_projects (project_id, organization_id, title, description, location, date) VALUES
-- BrightFuture Builders (Organization ID: 1)
(1, 1, 'Community Center Ramp Installation', 'Build accessible wheelchair ramps and handrails at the Eastside Community Center.', '142 Eastside Ave, Suite 4', '2026-12-01'),
(2, 1, 'Affordable Housing Solar Upgrade', 'Install eco-friendly solar panels and weatherization insulation for low-income family housing units.', '88 Ridgeview Heights', '2026-12-15'),
(3, 1, 'Oakwood Park Shelter Restoration', 'Repair structural wood beams, repaint, and rebuild picnic tables at Oakwood Park.', '500 Oakwood Park Dr', '2027-01-10'),
(4, 1, 'Riverside Playground Build', 'Construct a safe, modern, and sustainably built playground for neighborhood children.', '1200 Riverside Blvd', '2027-01-25'),
(5, 1, 'Eco-Friendly Bus Shelter Benches', 'Assemble recycled-lumber benches and shelter structures at heavily used city bus stops.', 'Downtown Transit Hub, 4th & Main', '2027-02-05'),

-- GreenHarvest Growers (Organization ID: 2)
(6, 2, 'Northside Raised Garden Bed Build', 'Construct 15 new raised garden beds and prepare organic soil for neighborhood residents.', '305 Greenleaf Way', '2026-11-20'),
(7, 2, 'Urban Compost & Hydroponics Setup', 'Set up a community composting station and conduct workshops on hydroponic growing.', 'Community Farm House, 712 Elm St', '2026-12-05'),
(8, 2, 'Local Fruit Tree Planting Day', 'Plant 40 fruit-bearing trees across public lots to expand fresh fruit access in local neighborhoods.', 'Maple Street Community Lot', '2026-12-18'),
(9, 2, 'Fresh Produce Mobile Market', 'Harvest and distribute fresh organic vegetables directly to underserved local families.', 'West End Community Center', '2027-01-15'),
(10, 2, 'School Garden Installation & Class', 'Build edible gardens at local elementary schools and teach students organic farming basics.', 'Lincoln Elementary School, 401 School Rd', '2027-02-12'),

-- UnityServe Volunteers (Organization ID: 3)
(11, 3, 'Metro Riverbank Cleanup', 'Clean up local parks and riverbanks to remove litter and make green spaces beautiful.', 'Metro Riverfront Park', '2026-11-25'),
(12, 3, 'Holiday Season Food Drive & Distribution', 'Collect and distribute food to individuals and families in need across local pantries.', 'Unity Community Center, 900 Central Ave', '2026-12-10'),
(13, 3, 'After-School Youth Tutoring Initiative', 'Volunteer to tutor students in core subjects and reading comprehension.', 'City Public Library, Youth Wing', '2027-01-08'),
(14, 3, 'Senior Home Repair & Safety Visit', 'Assist elderly residents with winter home maintenance, yard clearing, and safety checks.', 'Golden Years Residence, 650 Pine St', '2027-01-22'),
(15, 3, 'Coat & Winter Supplies Drive', 'Gather and distribute warm winter coats, blankets, and essential supplies for community shelters.', 'Civic Center Plaza', '2027-02-01');


-- Organization Table
-- ========================================

CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);


INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES
('BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),
('GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods.', 'contact@greenharvest.org', 'greenharvest-logo.png'),
('UnityServe Volunteers', 'A volunteer coordination group supporting local charities and service initiatives.', 'hello@unityserve.org', 'unityserve-logo.png');


-- Categories Table
-- ========================================

CREATE TABLE public.categories (
category_id SERIAL PRIMARY KEY,
category_name VARCHAR(255) NOT NULL UNIQUE
);

INSERT INTO public.categories (category_id, category_name) 
VALUES 
    (1, 'Environmetal'),
    (2, 'Educational'),
    (3, 'Community'),
    (4, 'Health and Wellness');

-- public.service_projects_categories
--=========================================

CREATE TABLE IF NOT EXISTS public.service_projects_categories
(
    project_id integer NOT NULL,
    category_id serial,
    PRIMARY KEY (project_id, category_id)
);

ALTER TABLE IF EXISTS public.service_projects_categories
    ADD CONSTRAINT "FK-project" FOREIGN KEY (project_id)
    REFERENCES public.service_projects (project_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;

ALTER TABLE IF EXISTS public.service_projects_categories
    ADD CONSTRAINT "FK-category" FOREIGN KEY (category_id)
    REFERENCES public.categories (category_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


select * from public.service_projects_categories

INSERT INTO public.service_projects_categories (project_id, category_id) 
VALUES 
    (1, 1),
    (1, 2),
    (2, 1);