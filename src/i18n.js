import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

// Překlady
const resources = {
  en: {
    translation: {
      overview: {
        login: "Please log in",
        allLists: "All Lists",
        archivedLists: "Archived Lists",
        addList: "Add List",
        deletequestion: "Are you sure you want to delete this shopping list?",
        deleteTooltip: "Delete",
        archiveTooltip: "Archive",
        detailTooltip: "Show list detail",
        more: "more",
      },
      detail: {
        all: "All items",
        unfinished: "Unfinished items",
        addItem: "Add item",
        addDialogName: "Create New Item",
        dialogHelperText: "Leave blank to default to 1",
        updateDialogName: "Renamne List",
        renameTooltip: "Rename",
        deleteTooltip: "Delete",
      },
      memberList: {
        owner: "List Owner",
        members: "Members",
        deleteQuestion: "Are you sure you want to delete this member?",
        leaveQuestion: "Are you sure you want to leave this list?",
        addMember: "Add Member",
        leaveList: "Leave List",
      },
      dialog: {
        confirm: "Confirm",
        cancel: "Cancel",
        name: "Name",
        count: "Count",
        user: "User",
      }
    },
  },
  cs: {
    translation: {
      overview: {
        login: "Nejprve se prosím přihlaste",
        allLists: "Všechny Listy",
        archivedLists: "Archivované Listy",
        addList: "Přidat List",
        deletequestion: "Opravdu chcete odstranit tento nákupní list?",
        deleteTooltip: "Odstranit",
        archiveTooltip: "Archivovat",
        detailTooltip: "Zobrazit detail listu",
        more: "Více"
      },
      detail: {
        all: "Všechny položky",
        unfinished: "Nesplněné položky",
        addItem: "Přidat položku",
        addDialogName: "Přidat novou položku",
        dialogHelperText: "Pole ponechte prázné pro nastavení hodnoty na 1",
        updateDialogName: "Přejmenovat List",
        renameTooltip: "Přejmenovat",
        deleteTooltip: "Odstranit",
      },
      memberList: {
        owner: "Vlastník listu",
        members: "Členové",
        deletequestion: "Opravdu chcete odstranit tohoto člena?",
        leaveQuestion: "Opravdu chcete odejít z tohoto listu?",
        addMember: "Přidat člena",
        leaveList: "Opustit list",
      },
      dialog: {
        confirm: "Potvrdit",
        cancel: "Zrušit",
        name: "Jméno",
        count: "Počet",
        user: "Uživatel",
      }
    },
  },
};

// Inicializace
i18n
  .use(LanguageDetector) // Přidání detektoru jazyka
  .use(initReactI18next) // Pro použití s Reactem
  .init({
    fallbackLng: 'en', // Jazyk, který se použije, pokud detekce selže
    debug: true, // Zobrazí ladící informace v konzoli
    interpolation: {
      escapeValue: false, // React už chrání před XSS
    },
    resources,
  });

export default i18n;