# How to enable SatNOGS Artifact Creation (2021-10-28)

1. Set `EXPERIMENTAL=True` to get development versions (can't be undone without flashing a new image!)
2. Enable Artifacts upload
   ```
   SATNOGS_ARTIFACTS_ENABLED=True
   SATNOGS_ARTIFACTS_API_URL=https://db-dev.satnogs.org/api/
   SATNOGS_ARTIFACTS_API_TOKEN={{ your SatNOGS DB API Token }}
   ```

NOTE: Upload to db & db-dev is currently broken due to a server-side bug.

To store artifacts locally
1. Create the output folder
   ```
   mkdir /tmp/.satnogs/artifacts`
   chmod satnogs:satnogs /tmp/.satnogs/artifacts
   ```
2. Activate artifact storage by modifying `/etc/default/satnogs-client` (not persistent!):
   ```
   SATNOGS_KEEP_ARTIFACTS="True"
   ```
