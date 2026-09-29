#!/usr/bin/env bash
set -euo pipefail

OUT_FILE="${1:-CHANGELOG.md}"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/../.." && pwd)"

cd "${REPO_ROOT}"

clean_subject() {
  local subject="$1"
  printf '%s' "${subject}" | sed -E 's/^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)(\([^)]+\))?!?:[[:space:]]*//I'
}

section_for_subject() {
  local lower
  lower="$(printf '%s' "$1" | tr '[:upper:]' '[:lower:]')"

  case "${lower}" in
    feat:*|feat\(*\):* )
      echo "Features"
      ;;
    fix:*|fix\(*\):*|hotfix:*|hotfix\(*\):* )
      echo "Fixes"
      ;;
    refactor:*|refactor\(*\):*|perf:*|perf\(*\):* )
      echo "Improvements"
      ;;
    docs:*|docs\(*\):* )
      echo "Documentation"
      ;;
    ci:*|ci\(*\):*|build:*|build\(*\):*|chore:*|chore\(*\):*|test:*|test\(*\):* )
      echo "Pipeline & Maintenance"
      ;;
    * )
      echo "Other Changes"
      ;;
  esac
}

HEAD_SUBJECT="$(git log --no-merges -1 --pretty=format:'%s' HEAD 2>/dev/null || true)"
HEAD_BODY="$(git log --no-merges -1 --pretty=format:'%b' HEAD 2>/dev/null || true)"
HEAD_HASH="$(git rev-parse --short HEAD 2>/dev/null || echo 'n/a')"
HEAD_AUTHOR="$(git log --no-merges -1 --pretty=format:'%an' HEAD 2>/dev/null || echo 'Unknown')"
HEAD_DATE="$(git log --no-merges -1 --date=short --pretty=format:'%ad' HEAD 2>/dev/null || date '+%Y-%m-%d')"
RELEASE_LABEL="${BUILD_BUILDNUMBER:-${GITVERSION_SEMVER:-Unreleased}}"
SUMMARY="$(clean_subject "${HEAD_SUBJECT:-Unreleased changes}")"
SECTION="$(section_for_subject "${HEAD_SUBJECT:-other}")"

CHANGED_FILES=()
while IFS= read -r file; do
  [[ -n "${file}" ]] && CHANGED_FILES+=("${file}")
done < <(git show --pretty='' --name-only --diff-filter=ACMRT HEAD 2>/dev/null | sed '/^$/d')

BODY_LINES=()
while IFS= read -r line; do
  [[ -n "${line}" ]] && BODY_LINES+=("${line}")
done < <(printf '%s\n' "${HEAD_BODY}" | sed '/^[[:space:]]*$/d; s/^[[:space:]]*//; s/[[:space:]]*$//')

{
  echo "# Changelog"
  echo
  echo "## ${RELEASE_LABEL}"
  echo
  echo "### ${SECTION}"
  echo
  echo "- ${SUMMARY} (${HEAD_HASH})"
  echo
  echo "### Release Details"
  echo
  echo "Commit: ${HEAD_HASH}"
  echo "Author: ${HEAD_AUTHOR}"
  echo "Date: ${HEAD_DATE}"
  echo

  if [[ ${#BODY_LINES[@]} -gt 0 ]]; then
    echo "### Notes"
    echo
    for line in "${BODY_LINES[@]}"; do
      echo "- ${line}"
    done
    echo
  fi

  if [[ ${#CHANGED_FILES[@]} -gt 0 ]]; then
    echo "### Files Changed"
    echo
    index=1
    for file in "${CHANGED_FILES[@]}"; do
      printf '%d. `%s`\n' "${index}" "${file}"
      index=$((index + 1))
    done
    echo
  fi

  if [[ -z "${HEAD_SUBJECT}" ]]; then
    echo "- No user-facing changes."
  fi
} > "${OUT_FILE}"

echo "Wrote ${OUT_FILE}"