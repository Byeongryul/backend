const condition = true;
const promise = new Promise((resolve, reject) => {
    if (condition){
        resolve('성공');
    } else {
        reject('실패');
    }
});

promise
.then((message) => {
    console.log(message);
})
.catch((error) => {
    console.log(error);
})
.finally(() => {
    console.log('무조건');
})

promise
.then((message) => {
    return new Promise((resolve, reject) => {
        resolve(message);
    });
})
.then((message2) => {
    console.log(message2);
    return new Promise((resolve, reject) => {
        resolve(message2);
    });
})
.then((message3) => {
    console.log(message3);
})
.catch((error) => {
    console.error(error);
})

// function findAndSaveUser(Users){
//     Users.findOne({}, (err, user) => {
//         if (err){
//             return console.error(err);
//         }
//         user.name = 'zero';
//         user.save((err) => {
//             if (err){
//                 return console.error(err);
//             }
//             Users.findOne({gender: 'm'}, (err, user) => {
//                 console.log('생략')
//             });
//         })
//     })
// }

// function findAndSaveUser(Users){
//     Users.findOne({})
//     .then((user) => {
//         user.name = 'zero';
//         return user.save();
//     })
//     .then((user) => {
//         return Users.findOne({gender: 'm'});
//     })
//     .then((user) => {
//         console.log('생략');
//     })
//     .catch(err =>{
//         console.error(err);
//     })
// }

// findAndSaveUser()
// findOne과 save 메소드에 내부적으로 프로미스가 존재함

const promise1 = Promise.resolve('성공1')
const promise2 = Promise.resolve('성공2')
Promise.all([promise1, promise2])
.then((result) => {
    console.log(result);
})
.catch((error) => {
    console.error(error);
})