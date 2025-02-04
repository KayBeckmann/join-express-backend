# Join

**Join** ist eine moderne Task- und Kontaktmanagement-Anwendung, die Ihnen hilft, Ihre Aufgaben und Kontakte effizient zu organisieren. Das Projekt besteht aus einem **Backend** (ExpressJS mit SQL-Datenbank) und einem **Frontend** (Vue 3 + Vite PWA).

## Features
### Backend
- **ExpressJS** mit REST-API
- **MySQL**-Datenbank für persistente Speicherung
- **JWT**-Authentifizierung (Registrierung & Login)
- **Task-Verwaltung** mit Unteraufgaben
- **Kontaktverwaltung** mit Geburtstagsfunktion
- **Docker**-Unterstützung

### Frontend
- **Vue 3** mit **Vite** für schnelle Entwicklung
- **PWA** (Progressive Web App) für Offline-Nutzung
- **Pinia** für State Management
- **Responsive Design** (Desktop & Mobile)
- **Kanban-Board** mit Drag & Drop
- **Lazy Loading** für optimale Performance
- **Benutzerfreundliche** Oberfläche mit Menü und Übersichten

## Technologien
### Backend
- ExpressJS
- MySQL
- Sequelize (ORM)
- JWT (Authentifizierung)
- Docker

### Frontend
- Vue 3
- Vite
- Pinia (State Management)
- Vue Router
- Axios (HTTP-Client)
- Vue Draggable (Drag & Drop)
- PWA (Service Worker)

## Installation
### Voraussetzungen
- Docker und Docker Compose
- Node.js (optional für lokale Entwicklung)

### Schritte
1. Repository klonen:

```bash
git clone https://github.com/your-repo/join.git
cd join
```
2. Umgebungsvariablen setzen:
- Erstellen Sie .env-Dateien im backend/ und frontend/ Verzeichnis.
- Beispiel für backend/.env:

```env
DB_HOST=db
DB_USER=user
DB_PASSWORD=password
DB_NAME=myapp
JWT_SECRET=your_jwt_secret
```
3. Docker-Container starten:

```bash
docker-compose up --build
```

4. Anwendung öffnen:
- Frontend: http://localhost:8080
- Backend-API: http://localhost:3000

## Datenbank (SQL)
### Tabellenstruktur
- **Users**: Benutzerkonten
- **Contacts**: Kontakte mit Geburtstagsfunktion
- **Tasks**: Aufgaben mit Unteraufgaben
- **Categories**: Kategorien für Aufgaben

### Beispiel-Schema
```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  status ENUM('idee', 'bearbeitung', 'prüfen', 'fertig') DEFAULT 'idee',
  priority ENUM('hoch', 'mittel', 'niedrig') DEFAULT 'mittel',
  due_date DATE
);
```

## API-Endpunkte (Backend)
### Authentifizierung
- POST /api/auth/register – Benutzerregistrierung
- POST /api/auth/login – Benutzerlogin

### Tasks
- GET /api/tasks – Alle Aufgaben abrufen
- POST /api/tasks – Neue Aufgabe erstellen
- PATCH /api/tasks/:id – Aufgabe aktualisieren

### Kontakte
- GET /api/contacts – Alle Kontakte abrufen
- POST /api/contacts – Neuen Kontakt erstellen

## Frontend-Komponenten
### AuthView
- LoginComponent: Anmeldung für bestehende Benutzer
- RegisterComponent: Registrierung neuer Benutzer

### HomeView
**Übersicht** mit:
- Aktuellem Datum & Uhrzeit
- Nächstem Geburtstag
- Nächstem fälligen Task
- Anzahl hochprioritärer Tasks

### KanbanView
- KanbanBoard: Drag & Drop Board
- TaskCard: Einzelne Task-Karte
- TaskForm: Formular zum Erstellen/Bearbeiten von Tasks

### ContactsView
- ContactList: Liste aller Kontakte
- ContactForm: Formular zum Erstellen/Bearbeiten von Kontakten

## Lizenz
Dieses Projekt steht unter der MIT-Lizenz. Weitere Informationen finden Sie in der LICENSE-Datei.

## Beitragende
Kay Beckmann – Projektleitung & Entwicklung

## Kontakt
Bei Fragen oder Anregungen kontaktieren Sie mich gerne:
- E-Mail: contact@kay-beckmann.com

Viel Spaß mit Join! 🚀