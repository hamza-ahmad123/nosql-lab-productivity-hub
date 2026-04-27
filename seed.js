// seed.js
// =============================================================================
//  Seed the database with realistic test data.
//  Run with: npm run seed
//
//  Required minimum:
//    - 2 users
//    - 4 projects (split across the users)
//    - 5 tasks (with embedded subtasks and tags arrays)
//    - 5 notes (some attached to projects, some standalone)
//
//  Use the bcrypt module to hash passwords before inserting users.
//  Use ObjectId references for relationships (projectId, ownerId).
// =============================================================================

require('dotenv').config();
const bcrypt = require('bcryptjs');
const { connect } = require('./db/connection');

(async () => {
  const db = await connect();

  // OPTIONAL: clear existing data so re-seeding is idempotent
  // await db.collection('users').deleteMany({});
  // await db.collection('projects').deleteMany({});
  // await db.collection('tasks').deleteMany({});
  // await db.collection('notes').deleteMany({});

  // =============================================================================
  //  TODO: Insert your seed data below.
  //
  //  Hints:
  //    - Hash passwords:   const hash = await bcrypt.hash('password123', 10);
  //    - Capture inserted ids:
  //        const u = await db.collection('users').insertOne({ ... });
  //        const userId = u.insertedId;
  //    - Use those ids when inserting projects/tasks/notes.
  //    - Demonstrate schema flexibility: include at least one optional field
  //      on SOME documents but not all (e.g. dueDate on some tasks only).
  //
  //  Sample task shape:
  //    {
  //      ownerId: <ObjectId>,
  //      projectId: <ObjectId>,
  //      title: "Write report introduction",
  //      status: "todo",
  //      priority: 3,
  //      tags: ["writing", "urgent"],
  //      subtasks: [
  //        { title: "Outline sections", done: true },
  //        { title: "Draft", done: false }
  //      ],
  //      createdAt: new Date()
  //    }
  // =============================================================================
  console.log('TODO: implement seed.js');

  const hash1 = await bcrypt.hash('123456', 10);
  const hash2 = await bcrypt.hash('123456', 10);

  const u1 = await db.collection('users').insertOne({
    email: 'user1@gmail.com',
    passwordHash: hash1,
    name: 'Hamza',
    createdAt: new Date()
  });

  const u2 = await db.collection('users').insertOne({
    email: 'user2@gmail.com',
    passwordHash: hash2,
    name: 'Khadija',
    createdAt: new Date()
  });

  const user1Id = u1.insertedId;
  const user2Id = u2.insertedId;

  const p1 = await db.collection('projects').insertOne({
    userId: user1Id,
    title: 'Project A',
    archived: false,
    createdAt: new Date()
  });

  const p2 = await db.collection('projects').insertOne({
    userId: user1Id,
    title: 'Project B',
    archived: false,
    createdAt: new Date()
  });

  const p3 = await db.collection('projects').insertOne({
    userId: user2Id,
    title: 'Project C',
    archived: false,
    createdAt: new Date()
  });

  const p4 = await db.collection('projects').insertOne({
    userId: user2Id,
    title: 'Project D',
    archived: false,
    createdAt: new Date()
  });

  const p1Id = p1.insertedId;
  const p2Id = p2.insertedId;
  const p3Id = p3.insertedId;
  const p4Id = p4.insertedId;

  await db.collection('tasks').insertMany([
    {
      ownerId: user1Id,
      projectId: p1Id,
      title: 'Task 1',
      status: 'todo',
      tags: ['work'],
      subtasks: [
        { title: 'Subtask 1', done: true },
        { title: 'Subtask 2', done: false }
      ],
      createdAt: new Date()
    },
    {
      ownerId: user1Id,
      projectId: p2Id,
      title: 'Task 2',
      status: 'in-progress',
      tags: ['study'],
      subtasks: [
        { title: 'Subtask 1', done: false }
      ],
      createdAt: new Date(),
      dueDate: new Date()
    },
    {
      ownerId: user2Id,
      projectId: p3Id,
      title: 'Task 3',
      status: 'done',
      tags: ['home'],
      subtasks: [],
      createdAt: new Date()
    },
    {
      ownerId: user2Id,
      projectId: p4Id,
      title: 'Task 4',
      status: 'todo',
      tags: ['urgent'],
      subtasks: [
        { title: 'Subtask 1', done: false }
      ],
      createdAt: new Date()
    },
    {
      ownerId: user1Id,
      projectId: p1Id,
      title: 'Task 5',
      status: 'done',
      tags: [],
      subtasks: [],
      createdAt: new Date()
    }
  ]);

  await db.collection('notes').insertMany([
    {
      userId: user1Id,
      content: 'Note 1',
      tags: ['work'],
      createdAt: new Date()
    },
    {
      userId: user1Id,
      content: 'Note 2',
      tags: ['study'],
      createdAt: new Date()
    },
    {
      userId: user2Id,
      content: 'Note 3',
      tags: ['home'],
      createdAt: new Date()
    },
    {
      userId: user2Id,
      content: 'Note 4',
      tags: [],
      createdAt: new Date()
    },
    {
      userId: user1Id,
      content: 'Note 5',
      tags: ['urgent'],
      createdAt: new Date()
    }
  ]);

  console.log('Seeding done');
  process.exit(0);
})();