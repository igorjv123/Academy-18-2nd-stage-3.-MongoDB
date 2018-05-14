
  // 1
  mongoimport --db usersDB /var/lib/mongodb/users.json

  // 2
  db.users.aggregate({$match: {age:{$gt: 0}}}, {$group:{_id: null, averageAge: {$avg: '$age'}}}).pretty()
    { "_id" : "", "averageAge" : 30.38862559241706 }

  // 3
  db.users.aggregate({ $match: { "address": /Alaska/ } }, { $group: { _id: null, averageAge: { $avg: '$age'} } })
    { "_id" : null, "averageAge" : 31.5 }

  // 4
  // ceil(30,38862559241706+31,5) = 61,944312796;
  // Здесь задание с уловкой, т.к. "Dennis" может быть не только именем но и
  // фамилиией, поэтому в запросе используеться пробел после имени, для того чтоб
  // убедиться, что это не конец поля и это не ластнейм

  db.users.findOne({$and:[{index: {$gt: 61}}, {"friends.name": /Dennis /}]})
      {
        "_id" : ObjectId("5adf3c1544abaca147cdd539"),
        "index" : 495,
        "guid" : "0423f60c-d252-4bae-93a3-860967f767b5",
        "name" : "Keller Nixon",
        "address" : "591 Jamison Lane, Idamay, Minnesota, 3128",
        "friends" : [
          {
            "id" : 0,
            "name" : "Clarissa Jones"
          },
          {
            "id" : 1,
            "name" : "Macias Riley"
          },
          {
            "id" : 2,
            "name" : "Dennis Randolph"
          }
        ],
        "greeting" : "Hello, Keller Nixon! You have 5 unread messages.",
        "favoriteFruit" : "apple"
      }

  // 5
  db.users.aggregate({ $match: { "address": /Minnesota/ } }, { $group: { _id: '$favoriteFruit', Amount: { $sum: 1} } })
    { "_id" : "strawberry", "Amount" : 3 }
    { "_id" : "apple", "Amount" : 10 }
    { "_id" : "banana", "Amount" : 2 }

  // 6
  db.users.find ({favoriteFruit: 'apple'}, {sort: '$registered:1'}).limit(1)
    { "_id" : ObjectId("5adf3c1544abaca147cdd34b") }

  // 7
  db.users.update({_id:ObjectId("5adf3c1544abaca147cdd34b")},{$set:{ features: 'first apple eater' }})
    WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })

  // 8
  db.users.remove({favoriteFruit: "strawberry"})
    WriteResult({ "nRemoved" : 253 })
