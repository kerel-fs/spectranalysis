## How to enable the creation of SatNOGS Artifacts (HDF5 files)

(last updated: 2022-02-18)

Using `sudo satnogs-setup` the two following steps must be performed to enable the creation of
SatNOGS Artifacts (HDF5 files).

1. Make sure that `satnogs-client` version 1.7 or later is installed, by one of the following methods:
   - Set `SATNOGS_CLIENT_VERSION` to `1.7` OR
   - Set `EXPERIMENTAL=True` to get development versions (can't be undone without flashing a new image!)
2. Enable Artifacts upload with
   ```
   SATNOGS_ARTIFACTS_ENABLED=True
   SATNOGS_ARTIFACTS_API_URL=https://db.satnogs.org/api/
   SATNOGS_ARTIFACTS_API_TOKEN={{ your SatNOGS DB API Token }}
   ```

Note:
The SatNOGS Network API Token and the SatNOGS DB API Token are different.
The Network API Token is required to fetch jobs and upload observations/waterfalls/audio/data,
the DB API Token is required to upload (hdf5) artifacts only. They can be easily confused,
both are 40 characters long alphanumeric strings.


## How to enable local SatNOGS Artifacts storage

In case the upload to db is broken, or for further local analysis, the following steps can
be performed to keep the artifacts stored locally.

1. Create the output folder
   ```
   mkdir /tmp/.satnogs/artifacts`
   chmod satnogs:satnogs /tmp/.satnogs/artifacts
   ```
2. Activate artifact storage by modifying `/etc/default/satnogs-client` (not persistent!):
   ```
   SATNOGS_KEEP_ARTIFACTS="True"
   ```
