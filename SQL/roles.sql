use CrickStats;

CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(50) UNIQUE NOT NULL
);

-- Insert roles into the roles table
INSERT INTO roles (role_name) VALUES ('Coach');
INSERT INTO roles (role_name) VALUES ('Player');
INSERT INTO roles (role_name) VALUES ('Fan');

ALTER TABLE User ADD COLUMN role_id INT;

-- Assuming the 'roles' table is already created, add a foreign key constraint
ALTER TABLE User ADD CONSTRAINT FK_User_Role FOREIGN KEY (role_id) REFERENCES roles(id);

select * from user;
SELECT * FROM User WHERE role_id = (SELECT id FROM roles WHERE role_name = 'Coach');



