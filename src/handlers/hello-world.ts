import { Context } from "../../dist";
import { Env, PluginSettings } from "../types";

export async function helloWorld(context: Context<PluginSettings, Env, "issue_comment.created">) {
  const {
    logger,
    payload,
    octokit,
    config: { configurableResponse, customStringsUrl },
  } = context;

  const sender = payload.comment.user?.login;
  const repo = payload.repository.name;
  const issueNumber = payload.issue.number;
  const owner = payload.repository.owner.login;
  const body = payload.comment.body;

  if (!body.match(/hello/i)) {
    logger.error(`Invalid use of slash command, use "/hello".`, { body });
    return;
  }

  logger.info("Hello, world!");
  logger.debug(`Executing helloWorld:`, { sender, repo, issueNumber, owner });

  try {
    await octokit.rest.issues.createComment({
      owner: payload.repository.owner.login,
      repo: payload.repository.name,
      issue_number: payload.issue.number,
      body: configurableResponse,
    });
    if (customStringsUrl) {
      const response = await fetch(customStringsUrl).then((value) => value.json());
      await octokit.rest.issues.createComment({
        owner: payload.repository.owner.login,
        repo: payload.repository.name,
        issue_number: payload.issue.number,
        body: response.greeting,
      });
    }
  } catch (error) {
    /**
     * logger.fatal should not be used in 9/10 cases. Use logger.error instead.
     *
     * Below are examples of passing error objects to the logger, only one is needed.
     */
    if (error instanceof Error) {
      logger.error(`Error creating comment:`, { error: error, stack: error.stack });
      throw error;
    } else {
      logger.error(`Error creating comment:`, { err: error, error: new Error() });
      throw error;
    }
  }

  logger.ok(`Successfully created comment!`);
  logger.verbose(`Exiting helloWorld`);
  return {
    success: true,
  };
}
