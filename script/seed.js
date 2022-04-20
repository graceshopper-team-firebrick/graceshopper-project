'use strict'

const {db, models: {User, Book} } = require('../server/db');
const booksToSeed = require('../server/db/models/seedBooks.js')

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */


async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')

  // Creating Users
  const users = await Promise.all([
    User.create({ username: 'cody', password: '123', email: 'cody@pug.com',
     address:  '220 Welton Way, Pofton, NY'}),
    User.create({ username: 'murphy', password: '123', email: 'murphy@beds.com',
    address:  '10 Burden Blvd, Crimes Hollow, NY'}),
  ])

  console.log(`seeded ${users.length} users`)

  // Creating books

  let booksSeeded = []

  for (let i = 0; i < booksToSeed.books.length; i++){
    console.log(booksToSeed.books[i])

    const seededBook = await Book.create(booksToSeed.books[i]);

    booksSeeded.push(seededBook);

  }

  console.log(booksSeeded.length, 'books seeded.')

  // Creating carts...

  let cartMin = 2;
  let cartMax = 12;

  let bookList = booksSeeded;

  let bookListLength = bookList.length;

  console.log(bookList[1] instanceof Book)

  for (let i = 0; i < users.length; i++){

    let cartSize = Math.floor(Math.random() * cartMax + cartMin)

    let j = 0;

    while (j < cartSize) {

      j++;

      let randomBook = bookList[Math.floor(Math.random() * bookListLength)]

      console.log(randomBook instanceof Book)

      await randomBook.setCart(users[i])

     }

  }

  console.log(`seeded successfully`)
  return {
    users: {
      cody: users[0],
      murphy: users[1]
    }
  }


}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
