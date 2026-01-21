# Security Policy

## Sensitive files (do not commit)
Never commit the following:
- `.env`
- `.auth/storageState.json`
- Any real credentials, tokens, cookies, or API keys
- Any screenshots/videos/traces containing sensitive data

These are already ignored in `.gitignore`, but always double-check before pushing.

## Reporting a vulnerability
If you believe you found a security issue, please open a GitHub Issue with:
- A clear description
- Steps to reproduce (without real secrets)
- Expected vs actual behavior

If the issue contains sensitive details, redact secrets before posting.
