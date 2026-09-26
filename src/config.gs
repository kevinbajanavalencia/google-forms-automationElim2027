const FORM_CONFIG = {
  id: "example_registration_form",

  languages: ["es", "fr"],

  title: {
    es: "Formulario de ejemplo",
    fr: "Formulaire d'exemple"
  },

  description: {
    es: "Formulario ficticio para probar el generador.",
    fr: "Formulaire fictif pour tester le générateur."
  },

  sections: [
    {
      id: "basic_information",

      title: {
        es: "Información básica",
        fr: "Informations de base"
      },

      questions: [
        {
          id: "full_name",
          type: "SHORT_ANSWER",
          required: true,

          label: {
            es: "Nombre completo",
            fr: "Nom complet"
          }
        },

        {
          id: "favorite_activity",
          type: "MULTIPLE_CHOICE",
          required: true,

          label: {
            es: "Actividad favorita",
            fr: "Activité préférée"
          },

          options: {
            es: ["Deporte", "Música", "Lectura"],
            fr: ["Sport", "Musique", "Lecture"]
          }
        },

        {
          id: "birth_date",
          type: "DATE",
          required: true,

          label: {
            es: "Fecha de nacimiento",
            fr: "Date de naissance"
          }
        },

        {
          id: "interests",
          type: "CHECKBOXES",
          required: false,

          label: {
            es: "Intereses",
            fr: "Centres d'intérêt"
          },

          options: {
            es: ["Tecnología", "Deporte", "Música"],
            fr: ["Technologie", "Sport", "Musique"]
          }
        },

        {
          id: "additional_comments",
          type: "PARAGRAPH",
          required: false,

          label: {
            es: "Comentarios adicionales",
            fr: "Commentaires supplémentaires"
          }
        }
      ]
    }
  ]
};