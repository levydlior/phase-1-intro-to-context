// Your code here

function createEmployeeRecord(employeeRecored) {
  const employeeCard = {};
  employeeCard["firstName"] = employeeRecored[0];
  employeeCard["familyName"] = employeeRecored[1];
  employeeCard["title"] = employeeRecored[2];
  employeeCard["payPerHour"] = employeeRecored[3];
  employeeCard[`timeInEvents`] = [];
  employeeCard[`timeOutEvents`] = [];
  return employeeCard;
}

function createEmployeeRecords(employeeCard) {
  const employeeArray = [];
  employeeCard.forEach((employee) => {
    employeeArray.push(createEmployeeRecord(employee));
  });
  return employeeArray;
}

function createTimeInEvent(employeeArray, dateStamp) {
  const timeObject = {
    type: `TimeIn`,
    hour: parseInt(dateStamp.split(" ")[1]),
    date: dateStamp.split(" ")[0],
  };
  employeeArray.timeInEvents.push(timeObject);

  return employeeArray;
}

function createTimeOutEvent(employeeArray, dateStamp) {
  const timeOutObj = {
    type: `TimeOut`,
    hour: parseInt(dateStamp.split(" ")[1]),
    date: dateStamp.split(" ")[0],
  };
  employeeArray.timeOutEvents.push(timeOutObj);
  return employeeArray
}


function hoursWorkedOnDate(employeeArray, date){
    const timeIn = employeeArray.timeInEvents.find(e=> {
        return e.date === date
    })
    const timeOut = employeeArray.timeOutEvents.find(e=> {
        return e.date === date
    })
    return (timeOut.hour - timeIn.hour) /100
}

function wagesEarnedOnDate(employeeRecored, date){
    let wageOwed = hoursWorkedOnDate(employeeRecored, date)* employeeRecored.payPerHour

    return wageOwed
}

function allWagesFor(employeeRecored){
    let allPay = 0
    employeeRecored.timeInEvents.forEach(time =>{
        let singlePay = wagesEarnedOnDate(employeeRecored, time.date)
        allPay += singlePay
    })
    return allPay
}


function calculatePayroll(employeeRecored){

    const totalPay = employeeRecored.reduce((firstVal, wage) => {
        const totalPay = allWagesFor(wage)
        return firstVal + totalPay
    }, 0)
    return totalPay}