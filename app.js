// The provided course information.
const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript"
};

// The provided assignment group.
const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500
    }
  ]
};

// The provided learner submission data.
const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47
    }
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150
    }
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400
    }
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39
    }
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140
    }
  }
];

// This function retrieves data related to learners, assignments, and submissions.
function getLearnerData(course, assignmentGroup, submissions) {
  // Storing course, assignmentGroup, and submissions data.
  this.course = course;
  this.assignmentGroup = assignmentGroup;
  this.submission = submissions;

  let ids = []; // Array to store learner ids
  let assignmentIds = []; // Array to store assignment ids
  let possiblePoints = []; // Array to store possible points for each assignment
  let studentPoints = []; // Array to store points obtained by students for each assignment

  // Extracting learner ids, assignment ids, and scores.
  for (let i = 0; i < submissions.length; i++) {
    if (!ids.includes(submissions[i].learner_id)) {
      ids.push(submissions[i].learner_id);
    }
    if (!assignmentIds.includes(submissions[i].assignment_id)) {
      assignmentIds.push(submissions[i].assignment_id);
    }
    if (assignmentIds.includes(submissions[i].assignment_id)) {
      studentPoints.push(submissions[i].submission.score);
    }
  }

  // Filtering out assignments due after a certain date and obtaining possible points.
  let y = 0;
  while (y < assignmentGroup.assignments.length) {
    if (assignmentGroup.assignments[y].due_at > '2024-03-22') {
      let del = assignmentIds.indexOf(assignmentGroup.assignments[y].id);
      assignmentIds.splice(del);
    }
    if (assignmentIds.includes(assignmentGroup.assignments[y].id)) {
      possiblePoints.push(assignmentGroup.assignments[y].points_possible);
    }
    y++;
  }

  // Adjusting scores for late submissions.
  for (let i = 0; i < assignmentIds.length; i++) {
    for (let j = 0; j < submissions.length; j++) {
      if (
        assignmentIds[i] === submissions[j].assignment_id &&
        submissions[j].submission.submitted_at > assignmentGroup.assignments[i].due_at
      ) {
        let index = studentPoints.indexOf(submissions[j].submission.score);
        let data = submissions[j].submission.score - assignmentGroup.assignments[i].points_possible * 0.1;
        studentPoints[index] = data;
      }
    }
  }

  let score1 = 0;
  let score2 = 0;
  let totalPossiblePoints = 0;
  let s2 = studentPoints.splice(-assignmentIds.length);
  let averages = [];
  let assignmentScores1 = [];
  let assignmentScores2 = [];

  // Calculating averages.
  for (let i = 0; i < studentPoints.length && i < s2.length; i++) {
    assignmentScores1.push(Number((studentPoints[i] / possiblePoints[i]).toFixed(2)));
    assignmentScores2.push(Number((s2[i] / possiblePoints[i]).toFixed(2)));
    score1 += studentPoints[i];
    score2 += s2[i];
    totalPossiblePoints += possiblePoints[i];
  }
  averages.push(score1 / totalPossiblePoints);
  averages.push(score2 / totalPossiblePoints);

  let result = [];

  // Constructor function to create learner data objects.
  function LearnerData(id, averages, score1, score2) {
    this.id = id;
    this.averages = averages;
    this[1] = score1;
    this[2] = score2;
  }

  // Creating learner data objects and storing them in the result array.
  for (let i = 0; i < assignmentIds.length; i++) {
    let obj;
    if (i === 0) {
      obj = new LearnerData(ids[i], averages[i], assignmentScores1[i], assignmentScores1[i + 1]);
    } else if (i === 1) {
      obj = new LearnerData(ids[i], averages[i], assignmentScores2[i - 1], assignmentScores2[i]);
    }
    result.push(obj);
  }

  return result;
}

try {
  // Checking if the course ID matches the assignment group course ID.
  if (CourseInfo.id === AssignmentGroup.course_id) {
    // If matched, retrieve learner data.
    const learnerData = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
    console.log(learnerData);
  } else {
    // If not matched, throw an error.
    throw new Error('Error: Course ID and Assignment Group Course ID do not match');
  }
} catch (error) {
  // Catching and logging errors.
  console.error(error);
}

// console.log(AssignmentGroup.assignments[0].id);
