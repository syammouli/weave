# 🚀 Commit Message Guidelines

To keep versioning, changelog generation, and Teams release updates clean, all commits should follow the Conventional Commits format.

## Format

```text
<type>: <short description>
```

Optional scope is allowed:

```text
<type>(scope): <short description>
```

## Allowed types

- `feat`: new feature
- `fix`: bug fix
- `refactor`: internal improvement
- `docs`: documentation update
- `chore`: maintenance or housekeeping
- `ci`: pipeline or automation change
- `build`: build or dependency change
- `test`: test-only change
- `perf`: performance improvement
- `style`: formatting-only change
- `revert`: revert a previous commit

## Good examples

```text
feat: add login page
fix(api): resolve timeout issue
refactor(map): simplify route marker rendering
docs: update deployment instructions
chore: update dependencies
```

## Avoid

```text
updated code
minor changes
fix stuff
test
build push --dev
```

## Why this matters

- enables automatic `CHANGELOG.md` generation
- produces cleaner Teams release notes
- improves debugging and release tracking
- keeps GitVersion-based releases easier to understand

## Policy

The pipeline validates commit subjects automatically. Invalid commit formats can be rejected during CI.