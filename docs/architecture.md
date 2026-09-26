# Project Architecture

## 1. Overview

This project separates source code, public technical documentation and private deployment-specific configuration.

The public repository contains only reusable implementation details and fictional examples.

Operational event information and real user data are intentionally kept outside the repository.

## 2. High-level architecture

```text
                    GitHub
                      ^
                      |
                     Git
                      |
                      v
               Local project
                on developer PC
                      |
                    clasp
                      |
                      v
              Google Apps Script
                      |
          +-----------+-----------+
          |                       |
          v                       v
     Google Forms            Google Sheets
          |                       ^
          |                       |
          +------ responses ------+
```

## 3. Git and GitHub

Git is used for source-code version control.

GitHub stores the public repository and its history.

Typical workflow:

```text
Edit files locally
       |
       v
git status
       |
       v
git add
       |
       v
git commit
       |
       v
git push
       |
       v
GitHub
```

GitHub does not execute the Google Apps Script project.

## 4. clasp

`clasp` is used to connect the local source files with a Google Apps Script project.

Conceptually:

```text
Local src/
    |
    | clasp push
    v
Google Apps Script

Google Apps Script
    |
    | clasp pull
    v
Local src/
```

Git and clasp therefore have different responsibilities:

```text
Git
Local project <----------> GitHub

clasp
Local project <----------> Google Apps Script
```

## 5. Google Apps Script

Google Apps Script contains the executable form-generation logic.

The source code is organized into separate files according to responsibility.

```text
src/
├── appsscript.json
├── main.gs
├── config.gs
├── form-builder.gs
├── spreadsheet.gs
└── utils.gs
```

### `main.gs`

Contains the main entry points used to run the project.

Examples may include:

- generating a form;
- generating multiple language versions;
- setting up spreadsheet integration.

### `config.gs`

Contains reusable form configuration structures and public example configuration.

Real deployment-specific content must not be committed to the public repository.

### `form-builder.gs`

Contains the logic that converts form configuration into Google Forms items using `FormApp`.

It is responsible for interpreting logical question types such as:

- short answer;
- paragraph;
- multiple choice;
- checkboxes;
- dates;
- sections.

### `spreadsheet.gs`

Contains spreadsheet-related logic.

Responsibilities may include:

- connecting Forms responses to Sheets;
- adding calculated or derived values;
- preparing response data for internal use.

### `utils.gs`

Contains small reusable helper functions that do not belong to one specific module.

### `appsscript.json`

Google Apps Script project manifest.

It contains Apps Script configuration required by the platform.

## 6. Form generation flow

The project follows a configuration-driven approach.

```text
Form configuration
        |
        v
Language selection
        |
        v
Form builder
        |
        v
Google Form
```

The builder contains the generation logic while the configuration describes what should be generated.

This avoids duplicating the same `FormApp` logic for every language.

## 7. Multilingual design

A logical field can contain translations without changing its internal identity.

Conceptually:

```text
Internal field
     |
     +---- Spanish label
     |
     +---- French label
```

Both language versions are generated from the same logical structure.

This reduces the risk that two language versions become structurally different.

## 8. Response flow

Once a generated Google Form is used:

```text
User submits form
        |
        v
Google Forms
        |
        v
Google Sheets
        |
        v
Optional derived values
```

Some information may be calculated in the spreadsheet instead of being entered manually by the user.

## 9. Public vs private information

The project uses a strict separation between reusable public code and private deployment information.

### Public repository

May contain:

- source code;
- technical documentation;
- generic form-building logic;
- fictional examples;
- setup instructions.

### Private / local only

Must contain any deployment-specific information such as:

- Apps Script project IDs;
- Google Form IDs;
- Google Sheet IDs;
- Google Drive IDs;
- private form content;
- operational event information;
- credentials or tokens;
- real user or response data.

## 10. Local private files

Private local configuration can be stored in files or directories ignored by Git.

Example:

```text
private/
.clasp.json
.env
```

These paths are excluded using `.gitignore`.

They must not be committed to the public repository.

## 11. Repository structure

```text
elim-Ycamp-form2027/
│
├── README.md
├── .gitignore
│
├── docs/
│   ├── requirements.md
│   ├── form_spec.md
│   └── architecture.md
│
└── src/
    ├── appsscript.json
    ├── main.gs
    ├── config.gs
    ├── form-builder.gs
    ├── spreadsheet.gs
    └── utils.gs
```

Additional files should only be added when they have a clear responsibility.

The project should remain small and understandable.

## 12. Design goals

The architecture aims to provide:

- reproducibility;
- separation of responsibilities;
- multilingual support;
- reusable form-generation logic;
- simple maintenance;
- safe use of a public repository;
- clear version history;
- separation between source code and deployment-specific information.