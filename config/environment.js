const development = {
    db: "EmployeeReviewSystem_Developer",
    secret: 'MSk4I2qFxb3pi2gNujTWnZfoHggju5qm',
}

const production = {
    db: process.env.DB,
    secret: process.env.SECRET,
}

// module.exports = production;
module.exports = eval(process.env.NODE_ENV) == undefined ? development : eval(process.env.NODE_ENV);