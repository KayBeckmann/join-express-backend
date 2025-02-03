CREATE DATABASE IF NOT EXISTS myapp;

USE myapp;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    phone VARCHAR(255),
    email VARCHAR(255),
    address VARCHAR(255),
    company VARCHAR(255),
    birthday DATE,
    notes TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status ENUM('idee', 'bearbeitung', 'prüfen', 'fertig') NOT NULL,
    priority ENUM('hoch', 'mittel', 'niedrig') NOT NULL,
    category_id INT,
    due_date DATE,
    assignee_id INT,
    FOREIGN KEY (category_id) REFERENCES categories(id),
    FOREIGN KEY (assignee_id) REFERENCES users(id)
);

CREATE TABLE subtasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    task_id INT,
    title VARCHAR(255) NOT NULL,
    status BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (task_id) REFERENCES tasks(id)
);