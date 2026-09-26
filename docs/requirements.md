# Project Requirements

## 1. Purpose

This project demonstrates a reproducible system for generating and managing multilingual registration forms using Google Workspace technologies.

The repository is designed as a technical portfolio project and does not contain operational event information or real participant data.

## 2. Technologies

The project uses:

- Google Apps Script
- Google Forms
- Google Sheets
- Google Drive
- JavaScript
- Git
- GitHub
- clasp

## 3. Main requirements

The solution must:

- Generate Google Forms programmatically.
- Support multiple languages from a shared form structure.
- Avoid unnecessary duplication between language versions.
- Support different Google Forms question types.
- Support required and optional fields.
- Support logical sections of a form.
- Store submitted responses in Google Sheets.
- Support values derived from submitted responses.
- Keep deployment-specific configuration separate from public source code.
- Be reproducible by another developer following the documentation.

## 4. Configuration-driven design

Form content should be separated from the logic that creates Google Forms.

A configuration describes:

- sections;
- questions;
- question types;
- translations;
- options;
- required/optional status.

The form builder interprets this configuration and creates the corresponding Google Form.

## 5. Multilingual support

The same logical form structure must be usable for multiple languages.

Translations should not require maintaining completely independent copies of the form-generation logic.

## 6. Spreadsheet integration

Form responses must be connected to Google Sheets.

The system may also create derived values from submitted information instead of asking users to enter redundant information manually.

## 7. Privacy

This is a public repository.

It must never contain:

- real form responses;
- personal data;
- sensitive information;
- event schedules or locations;
- participant information;
- private contact information;
- Google resource IDs;
- Apps Script project IDs;
- credentials;
- tokens;
- private deployment configuration.

Only source code, technical documentation and fictional example data may be committed.

## 8. Reproducibility

Another developer should eventually be able to:

1. clone the repository;
2. install the required tools;
3. create their own Apps Script project;
4. connect the local project using clasp;
5. provide their own private configuration;
6. generate their own Google Forms;
7. connect responses to Google Sheets.

## 9. Scope

This repository demonstrates the technical implementation of the form-generation solution.

Real event administration and operational information are intentionally excluded.