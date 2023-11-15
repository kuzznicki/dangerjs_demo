import { message, danger, warn, fail } from "danger";

const modifiedMD = danger.git.modified_files.join("\n - ");
message("Changed Files in this PR: \n - " + modifiedMD);

const commits = danger?.github?.commits || [];

if (commits.length) {
  const commitsMD = danger.github.commits
    .map((c) => c.commit.message)
    .join("\n - ");

  message(`Commits (${commits.length}): \n - ` + commitsMD);

  if (commits.length > 2) {
    warn("Try to reduce number of commits");
  }
}

const prTitle = danger.github.pr.title;
const jiraIdRegex = /\bDS-\d{1,}\b/;

if (!jiraIdRegex.test(prTitle)) {
  fail("Please include JIRA Task ID (DS-xxxx) in PR Title");
}
