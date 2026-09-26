# Form Configuration Specification

## 1. Purpose

This document describes the technical structure used to define forms in this project.

The real event form content is intentionally excluded from the public repository.

The objective is to separate:

- form content;
- translations;
- form-generation logic;
- deployment-specific configuration.

This makes the solution easier to maintain, reuse and reproduce.

## 2. Configuration-driven approach

Forms are not created by manually writing one `FormApp` call for every question.

Instead, the form is described using a JavaScript configuration object.

Example:

```javascript
{
  id: "example_field",
  type: "SHORT_ANSWER",
  required: true,

  label: {
    es: "Campo de ejemplo",
    fr: "Champ d'exemple"
  }
}
```

The form builder reads this configuration and creates the corresponding Google Forms item.

## 3. Question identifiers

Every question should have a stable internal identifier.

Example:

```javascript
id: "contact_email"
```

The ID does not depend on the displayed language.

This allows the Spanish and French versions to represent the same logical field.

## 4. Multilingual labels

Text displayed to users can contain multiple translations.

Example:

```javascript
label: {
  es: "Correo electrónico",
  fr: "Adresse e-mail"
}
```

The form builder selects the correct value depending on the language being generated.

## 5. Supported field types

The initial implementation should support the following logical types:

- `SHORT_ANSWER`
- `PARAGRAPH`
- `MULTIPLE_CHOICE`
- `CHECKBOXES`
- `DATE`

Additional types may be added later when required.

## 6. Required fields

Questions can define whether a response is mandatory.

Example:

```javascript
required: true
```

or:

```javascript
required: false
```

The form builder converts this property to the corresponding Google Forms setting.

## 7. Options

Question types such as multiple choice and checkboxes may contain translated options.

Example:

```javascript
options: {
  es: ["Opción A", "Opción B"],
  fr: ["Option A", "Option B"]
}
```

The logical structure remains the same in every language.

## 8. Sections

Forms may be divided into logical sections.

A section can contain:

- an internal ID;
- translated title;
- optional translated description;
- questions.

Conceptual example:

```javascript
{
  id: "example_section",

  title: {
    es: "Sección de ejemplo",
    fr: "Section d'exemple"
  },

  questions: []
}
```

## 9. Form-level configuration

A form definition may also contain:

- internal form ID;
- translated title;
- translated description;
- sections;
- supported languages.

Conceptual structure:

```javascript
{
  id: "example_form",

  title: {
    es: "Formulario de ejemplo",
    fr: "Formulaire d'exemple"
  },

  description: {
    es: "Descripción de ejemplo.",
    fr: "Description d'exemple."
  },

  sections: []
}
```

## 10. Derived spreadsheet data

Some values do not need to be requested directly from the user.

They can instead be calculated from submitted data after the response reaches Google Sheets.

This avoids asking users for redundant information and reduces inconsistent responses.

The calculation logic belongs to the spreadsheet integration layer rather than the form definition itself.

## 11. Public and private configuration

This repository contains the reusable implementation and technical examples.

Real deployment-specific form content must not be committed to the public repository.

The production configuration should be kept separately and must not contain real participant responses inside source control.

## 12. Design principle

The project follows this general model:

```text
Form configuration
        |
        v
Multilingual form builder
        |
        v
Google Forms
        |
        v
Google Sheets
        |
        v
Derived / processed values
```

The goal is to keep the form-generation logic reusable while allowing the actual form definition to change independently.