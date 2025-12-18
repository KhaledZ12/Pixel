-- Add category column to services table
ALTER TABLE services 
ADD COLUMN category TEXT DEFAULT 'marketing';

-- Add check constraint for category values
ALTER TABLE services 
ADD CONSTRAINT services_category_check 
CHECK (category IN ('marketing', 'programming'));

-- Update existing services to have marketing category by default
UPDATE services SET category = 'marketing' WHERE category IS NULL;
