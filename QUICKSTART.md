# Quickstart

[Home](README.md) · [Tools](TOOLS.md) · [Workflows](WORKFLOWS.md)

## Install

Run from your project and choose your active agent.

```sh
npx skills add sinaradme/agentic-ui-ux --skill agentic-ui-ux
```

## Give the agent your task

```text
Use agentic-ui-ux to add motion to this flow and verify it in a browser.
```

The agent chooses providers and submits their exact IDs to [the connector](skills/agentic-ui-ux/references/direct-connect.md). It installs missing official skill files, follows their original workflows and performs official registry, runtime or MCP actions as needed. Provider hooks and broad tool permissions require specific approval.

## Check the result

Look for the original repository and revision, the invocation or original file-based use, any commands executed, and task-specific evidence such as a browser interaction. See [connection test results](DIRECT-CONNECT-QC.md).
