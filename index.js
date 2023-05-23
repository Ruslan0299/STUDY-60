import { promises as fsPromises, constants } from "fs";

const users = [
  { name: "Mike", age: 25 },
  { name: "Bob", age: 32 },
  { name: "Nikola", age: 17 },
];

const updateDataFile = async () => {
  try {
    const newData = [
      { name: "Anna", age: 24 },
      { name: "Tom", age: 52 },
    ];

    const updatedUsers = [...users, ...newData];
    const updatedData = JSON.stringify({ users: updatedUsers });

    await fsPromises.writeFile("data.json", updatedData, "utf-8");
    console.log("File updated successfully");
  } catch (error) {
    console.log("Error updating file:", error);
  }
};

const isExist = async (filePath) => {
  try {
    await fsPromises.access(filePath, constants.F_OK);
    return true;
  } catch (error) {
    return false;
  }
};

const readFile = async () => {
  const filePath = "data.json";
  const fileExist = await isExist(filePath);
  if (fileExist) {
    try {
      const fileData = await fsPromises.readFile(filePath, "utf-8");
      console.log("File content:", fileData);
    } catch (error) {
      console.log("Error reading file:", error);
    }
  } else {
    console.log("File does not exist");
  }
};

updateDataFile();
readFile();
