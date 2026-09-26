# Multilingual Google Forms Automation

A reusable Google Apps Script project for generating multilingual Google Forms and connecting their responses to Google Sheets.

The project was developed from a real administrative use case, while all deployment-specific and sensitive information is intentionally kept outside the public repository.

## Features

- Configuration-driven Google Form generation
- Multiple languages from one logical form structure
- Google Forms integration with Apps Script
- Google Sheets response integration
- Support for multiple question types
- Required and optional fields
- Form sections
- Derived spreadsheet data
- Separation between public source code and private deployment configuration
- Local development using `clasp`
- Version control with Git and GitHub

## Technologies

- JavaScript
- Google Apps Script
- Google Forms
- Google Sheets
- Google Drive
- clasp
- Git
- GitHub

## Privacy

This repository contains only reusable source code, technical documentation and fictional examples.

It does not contain:

- real participant data;
- real event details;
- operational schedules;
- private contact information;
- sensitive form responses;
- Google resource IDs;
- credentials or tokens;
- private deployment configuration.

Deployment-specific files are kept outside Git version control.

## Architecture

The project separates form definition from form-generation logic.

```text
Configuration
      |
      v
Form Builder
      |
      v
Google Forms
      |
      v
Google Sheets
```

The same form structure can generate multiple language versions without duplicating the generation logic.

More information is available in the `docs/` directory.