import { employees, getRandomInt } from "#db/employees";
import express from "express";
const app = express();

const PORT = 3001;

app.listen(PORT, () => {
  console.log("Server is running on port: " + PORT);
});

app.get("/", (req, res) => {
  res.send("Hello employees!");
});

app.get("/employees", (req, res) => {
  res.send(employees);
});

let lastRandomIndex = null;
app.get("/employees/random", (req, res) => {

  let randomIndex;
  do {
    randomIndex = getRandomInt(0, employees.length - 1);
  } while (randomIndex === lastRandomIndex);

  lastRandomIndex = randomIndex;
  res.json(employees[randomIndex]);
});

app.get("/employees/:id", (req, res) => {
  const employeeId = Number(req.params.id);
  const employee = employees.find((single_employee) => single_employee.id === employeeId);

  if (!employee) {
    return res.status(404).json({ error: "Employee not found" });
  }

  res.json(employee);
});

export default app;
