# Deployment Pipeline (Azure DevOps YAML)

This document reflects the **current** pipeline implemented in `azure-pipelines.yml` for the `weave-agent-ui` repository. The pipeline is YAML-based and currently focuses on **Build + Dev deployment** with security scanning, versioning, changelog automation, health checks, rollback, tagging, and Teams notifications.

---

## Scope

- Repo: `weave-agent-ui`
- Branch trigger: `pipeline-dev`
- PR trigger: `pipeline-dev`
- Pipeline type: **Azure DevOps YAML**
- Active deployment environment: `weave-agent-dev-vm`

> There is **no separate Prod stage** in the current YAML file.

---

## Current Features Added in the Pipeline

### 1. Source control and validation
- full checkout with `persistCredentials: true`
- complete git history with `fetchDepth: 0`
- commit message validation through `scripts/release/validate_commit_messages.sh`
- configurable lint mode through `COMMIT_LINT_MODE`

### 2. Security scanning with Snyk
- supports the official `SnykSecurityScan@1` task when a valid Snyk service connection name is supplied through the `snykServiceConnection` parameter
- falls back to `snyk` CLI using `SNYK_TOKEN` and `SNYK_ORG` when no service connection is configured
- scans with severity threshold set to `high`
- can populate the **Snyk Report** tab only when the official Snyk task is used with an authorized service connection

### 3. Versioning and tagging
- installs and runs `GitVersion.Tool`
- updates the Azure DevOps build number using `$(GitVersion.SemVer)`
- tags releases using `scripts/release/tag_release.sh`

### 4. Build and image publishing
- builds and pushes the UI image to ACR using `AzureCLI@2`
- uses:
  - `ACR_NAME`
  - `DOCKER_REGISTRY`
  - `DOCKER_IMAGE_NAME`
  - `AZURE_SERVICE_CONNECTION`
- skips image push for pull requests

### 5. Changelog automation
- generates `CHANGELOG.md` using `scripts/release/generate_changelog.sh`
- publishes `CHANGELOG.md` as the `changelog` artifact
- commits changelog updates back to the source branch for non-PR runs

### 6. Dev deployment and rollback
- deploys to `weave-agent-dev-vm`
- uses managed identity login on the VM via `az login --identity`
- pulls the new image from ACR and starts it with `docker compose`
- runs smoke/health checks against:
  - `DEV_HEALTHCHECK_URL`
  - `DEV_SMOKE_TEST_URL`
- rolls back to the previous image **only if the deployed container fails health checks**
- does **not** roll back just because the new image pull failed before replacement

### 7. Teams deployment notification
- posts a Teams Adaptive Card after deployment
- includes:
  - build number
  - GitVersion version
  - environment name
  - recent changelog items
- runs with `condition: always()` and `continueOnError: true`

---

## Required Azure DevOps Setup

### Variable group
The pipeline expects the `pipeline-secrets` variable group to contain the required secrets and identity values.

Recommended entries:
- `SNYK_TOKEN` (secret)
- `SNYK_ORG` (secret or plain value)
- `TEAMS_WEBHOOK_URL` (secret)
- `GIT_TAG_USER`
- `GIT_TAG_EMAIL`

### Service connections
- `AZURE_SERVICE_CONNECTION` for `az acr build`
- optional Snyk service connection for the official `SnykSecurityScan@1` task

### Snyk report visibility
To make the **Snyk Report** tab visible in Azure DevOps:
- create and authorize a Snyk service connection in Azure DevOps
- pass its literal name in the YAML parameter:

```yaml
parameters:
  - name: snykServiceConnection
    type: string
    default: 'snykToken'
```

If this parameter remains empty, the CLI fallback still scans, but the **Snyk Report tab will not be populated**.

---

## Current Stage Flow

### Build stage
The `Build` stage currently performs:
1. checkout and git history fetch
2. Node.js setup
3. commit subject validation
4. Snyk scan
5. GitVersion execution
6. build-number update
7. ACR image build and push
8. changelog generation
9. changelog commit-back to the branch
10. release tagging
11. changelog artifact publish

### Dev stage
The `Dev` stage currently performs:
1. download the changelog artifact
2. deploy to the VM environment
3. pull and run the new container image
4. run smoke/health checks
5. roll back if the new deployment is unhealthy
6. send Teams notification

---

## Release Notes Status

### Are release notes generated per release right now?
**No. Not as a separate Azure DevOps release-notes artifact or task.**

What is currently happening instead:
- `CHANGELOG.md` is generated during the build
- the changelog is published as a pipeline artifact
- recent changelog items are included in the Teams deployment message

So the pipeline currently has **changelog-based release information**, but **not a separate “Generate Release Notes” task per release**.

If needed later, a dedicated release-notes generator can be added, but it is **not part of the current YAML**.

---

## Useful Commands Used by the Pipeline

### Generate changelog
```bash
bash scripts/release/generate_changelog.sh CHANGELOG.md
```

### Validate commit messages
```bash
bash scripts/release/validate_commit_messages.sh
```

### Tag release
```bash
bash scripts/release/tag_release.sh "$(GitVersion.SemVer)"
```

---

## Operational Checklist

- [x] Build pipeline uses GitVersion and updates build number
- [x] Commit messages are validated in CI
- [x] Snyk scan is included
- [x] Changelog is generated and published
- [x] Changelog is committed back to the branch
- [x] Dev stage deploys successfully after build
- [x] Health check and smoke test run after deployment
- [x] Rollback occurs on failed health check
- [x] Tags are created for releases
- [x] Teams notification posts after Dev deployment
- [ ] Separate release notes are generated per release
- [ ] Prod stage with approval gate is configured