let allStudents = ['A', 'B-', 1, 4, 5, 2];
let studentsWhoPass = [];

for(let i = 0; i < allStudents.length; i++){

    if (typeof allStudents[i] === 'string'){  
    // 字符串评分 
        if (allStudents[i] <= 'C')
            studentsWhoPass.push(allStudents[i]);  
    }
    else{  
    // 数字评分 
        if(allStudents[i] >= 3)
            studentsWhoPass.push(allStudents[i]);  
    }
}

console.log(studentsWhoPass);
