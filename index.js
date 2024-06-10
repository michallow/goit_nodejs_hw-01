import contacts from "./contacts.js";
import { Command } from "commander";

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();
console.log(argv); // Logowanie argumentów

const invokeAction = async({ action, id, name, email, phone }) => {
  try {
    switch (action) {
      case "list":
        const contactsList = await contacts.getContactsList();
        console.table(contactsList);
        break;
      case "get":
        const contact = await contacts.getContactById(id);
        console.log(contact);
        break;
      case "add":
        const newContact = await contacts.addContact(name, email, phone);
        console.log(newContact);
        break;
      case "remove":
        const removedContact = await contacts.removeContact(id);
        console.log(removedContact);
        break;
      case "updateById":
        const updatedContact = await contacts.updateContactById(id, name, email, phone);
        console.log(updatedContact);
        break;
      default:
        console.warn("\x1B[31m Unknown action type!");
    }
  } catch (error) {
    console.error("\x1B[31m Error:", error.message);
  }
};

invokeAction(argv);
