# Schema Design — Personal Productivity Hub

> Fill in every section below. Keep answers concise.

---

## 1. Collections Overview

Briefly describe each collection (1–2 sentences each):

- **users** —
Each user represents a person using the app.

Reason:
Users are stored separately because authentication is required.

--------------------------------------------------------------

- **projects** —
Each project belongs to a user.

Reason:
Projects are linked to users using userId (reference model).

-------------------------------------------------------------

- **tasks** —
Each task belongs to a project.

Reason:
Tasks are stored separately to allow scaling.
Subtasks are embedded because they are always used with tasks.

--------------------------------------------------------------

- **notes** —
Notes belong to users.

Reason:
Notes are independent but linked to users.

---

## 2. Document Shapes

For each collection, write the document shape (field name + type + required/optional):

### users
```
{
  _id: ObjectId,
  email: string (required, unique),
  passwordHash: string (required),
  name: string (required),
  createdAt: Date (required)
}
```

### projects
```
{
  _id: ObjectId,
  userId: ObjectId (required),
  title: string (required),
  archived: boolean (default: false),
  createdAt: Date (required)
}
```

### tasks
```
{
  _id: ObjectId,
  projectId: ObjectId (required),
  title: string (required),
  status: string (required),
  tags: [string] (optional),
  subtasks: [
    {
      title: string,
      completed: boolean
    }
  ] (optional),
  createdAt: Date (required)
}
```

### notes
```
{
  _id: ObjectId,
  userId: ObjectId (required),
  content: string (required),
  tags: [string] (optional),
  createdAt: Date (required)
}
```

---

## 3. Embed vs Reference — Decisions

For each relationship, state whether you embedded or referenced, and **why** (one sentence):

| Relationship                       | Embed or Reference? | Why? |
|-----------------------------------|---------------------|------|
| Subtasks inside a task            |            Embed        |   Subtasks are always used with     their parent task and are small in size.   |

| Tags on a task                    |            Embed        |   Tags are simple values and do not need a separate collection.   |

| Project → Task ownership          |           Reference     |    Tasks can grow large in number and should be stored separately for scalability.  |

| Note → optional Project link      |           Reference     |    Notes may or may not belong to a project so referencing keeps flexibility.  |

---

## 4. Schema Flexibility Example

Name one field that exists on **some** documents but not **all** in the same collection. Explain why this is acceptable (or even useful) in MongoDB.

> _Your answer here._
The "tags" field in tasks and notes may exist in some documents but not all. This is acceptable in MongoDB because it is schema-less, allowing flexibility to store only relevant data without enforcing a strict structure.