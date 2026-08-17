# Security Policy

## Supported versions

The portal is deployed from the `main` branch to GitHub Pages. Only the
deployment produced from the latest `main` is supported; fixes are
applied via PRs to `main`, so keep the branch up to date to receive
them promptly.

## Reporting a vulnerability

**Do not open a public GitHub issue for security vulnerabilities.**

Report privately via GitHub Security Advisories (private vulnerability
reporting):

https://github.com/Continuous-DrivenArchitecture/developer-portal/security/advisories

When filing a report, include:

- where the vulnerable content appears (page URL or source path);
- a minimal reproduction or the content you observed;
- the impact you observed or suspect.

## What happens next

1. The maintainer acknowledges the report within 72 hours and triages it.
2. A fix is prepared on a branch and merged to `main` through the
   normal PR workflow (protected branch, status checks).
3. The fix deploys automatically to GitHub Pages; a GitHub Security
   Advisory is published once the fix is available, and the issue is
   disclosed publicly only after coordination.