#!/usr/bin/env bash
set -euo pipefail

MODE="${COMMIT_LINT_MODE:-strict}"
VALID_TYPES='feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert'
REGEX="^(${VALID_TYPES})(\\([a-zA-Z0-9._/-]+\\))?!?: .+"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/../.." && pwd)"
cd "${REPO_ROOT}"

LAST_TAG=""
if LAST_TAG="$(git describe --tags --abbrev=0 2>/dev/null)"; then
  RANGE="${LAST_TAG}..HEAD"
elif git rev-parse HEAD~1 >/dev/null 2>&1; then
  RANGE="HEAD~1..HEAD"
else
  RANGE="HEAD"
fi

echo "Validating commit messages in range: ${RANGE}"

invalid=0
while IFS= read -r subject; do
  [[ -z "${subject}" ]] && continue

  if [[ ! "${subject}" =~ ${REGEX} ]]; then
    echo "Invalid commit message: ${subject}"
    invalid=1
  fi
done < <(git log --no-merges --pretty=format:'%s' "${RANGE}" 2>/dev/null || true)

if [[ ${invalid} -eq 1 ]]; then
  echo
  echo "Expected Conventional Commits, for example:"
  echo "  feat: add login page"
  echo "  fix(api): resolve timeout issue"
  echo "  chore: update dependencies"

  if [[ "${MODE}" == "warn" ]]; then
    echo "Commit lint mode is 'warn'; continuing without failing the pipeline."
    exit 0
  fi

  echo "Commit lint mode is 'strict'; failing the pipeline."
  exit 1
fi

echo "All commit messages are valid."