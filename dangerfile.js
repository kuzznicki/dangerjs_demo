import { message, danger, warn, fail } from "danger";

message(`Changed Files in this PR:` + list(danger.git.modified_files));

const commits = danger?.github?.commits || [];

if (commits.length) {
  message(
    `Commits (${commits.length}):` + list(commits.map((c) => c.commit.message))
  );

  if (commits.length > 2) {
    warn("Try to reduce number of commits");
  }
}

const prTitle = danger.github.pr.title;
const jiraIdRegex = /\bDS-\d{1,}\b/;

if (!jiraIdRegex.test(prTitle)) {
  fail("Please include JIRA Task ID (DS-xxxx) in PR Title");
}

function list(items) {
  return `

${items.join("\n - ")}
    
`;
}
