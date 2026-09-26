# Project Architecture

## 1. Overview

This project separates reusable public source code from private deployment-specific configuration.

The public repository contains only technical implementation details and fictional examples.

Operational information, real form content and user data are intentionally kept outside the repository.

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

Git manages the source-code history.

GitHub stores the public repository.

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

`clasp` connects the local source files with Google Apps Script.

```text
Local project
     |
     | clasp push
     v
Google Apps Script
```

and:

```text
Google Apps Script
     |
     | clasp pull
     v
Local project
```

Git and clasp therefore have different responsibilities:

```text
Git
Local project <----------> GitHub

clasp
Local project <----------> Google Apps Script
```

Files ignored by Git can still be synchronized with Apps Script through clasp.

This makes it possible to keep private deployment configuration outside the public repository while still using it in the real Apps Script project.

## 5. Google Apps Script source structure

The public source code is organized by responsibility.

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

Contains public entry points that demonstrate how the reusable system is executed.

### `config.gs`

Contains fictional configuration used to demonstrate the public form structure.

It does not contain real deployment-specific form content.

### `form-builder.gs`

Contains the reusable logic that converts configuration objects into Google Forms.

Supported logical field types include:

- short answer;
- paragraph;
- multiple choice;
- checkboxes;
- date fields;
- form sections.

### `spreadsheet.gs`

Contains reusable Google Sheets integration logic.

Its responsibilities include:

- creating response spreadsheets;
- connecting Google Forms to Sheets;
- supporting derived spreadsheet values.

### `utils.gs`

Contains reusable helper functions that do not belong to one specific module.

### `appsscript.json`

Contains the public Google Apps Script project manifest.

It does not contain deployment-specific Google resource IDs.

## 6. Private local files

The real deployment uses additional local files.

```text
src/private-config.gs
src/private-main.gs
.clasp.json
```

These files are excluded from Git using `.gitignore`.

They may still be synchronized to the private Google Apps Script project through clasp.

### `private-config.gs`

Contains deployment-specific form configuration.

Its contents are never committed to the public repository.

### `private-main.gs`

Contains entry points used only for the private deployment.

### `.clasp.json`

Associates the local directory with a specific Google Apps Script project.

Because it contains deployment-specific information, it is not committed.

## 7. Configuration-driven form generation

The reusable architecture separates data from logic.

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

For example, one logical field may have multiple translated labels:

```text
Internal field
     |
     +---- Spanish translation
     |
     +---- French translation
```

The builder remains the same regardless of language.

## 8. Form generation flow

Conceptually:

```text
Configuration
      |
      v
buildForm()
      |
      v
FormApp
      |
      v
Google Form
```

The configuration describes what should be generated.

The builder determines how Google Forms should generate it.

This avoids duplicating form-generation code for each language.

## 9. Spreadsheet integration

Generated forms can be connected programmatically to Google Sheets.

```text
Google Form
     |
     | submission
     v
Google Sheets
     |
     v
Derived / processed values
```

Values that can be calculated from existing responses do not need to be entered manually by users.

This reduces redundant information and inconsistent input.

## 10. Public and private boundaries

### Public repository

May contain:

- reusable source code;
- technical documentation;
- generic configuration structures;
- fictional examples;
- setup instructions.

### Private deployment

May contain:

- real form content;
- operational information;
- Apps Script project IDs;
- Google Form IDs;
- Google Sheet IDs;
- Google Drive IDs;
- credentials;
- access tokens;
- real responses;
- personal or sensitive data.

Private deployment information must never be committed to the public repository.

## 11. Repository structure

```text
multilingual-google-forms-automation/
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

Private local files exist alongside this structure but are ignored by Git.

## 12. Design goals

The architecture aims to provide:

- reproducibility;
- separation of responsibilities;
- multilingual support;
- reusable form-generation logic;
- Google Workspace automation;
- simple maintenance;
- safe use of a public repository;
- clear version history;
- separation between public code and private deployment information.