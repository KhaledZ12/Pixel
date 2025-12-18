-- Add featured column to projects table
ALTER TABLE projects 
ADD COLUMN featured BOOLEAN DEFAULT FALSE;

-- Update existing projects to be featured by default (optional, can be removed if you want all existing projects to be non-featured)
UPDATE projects SET featured = TRUE WHERE featured IS NULL;
