# SatNOGS Artifacts Waterfall Viewer

This demo is based on the spectroplot.js example relying on the EasyCloning class for creating the DOM needed by the library.
It implements loading of SatNOGS Artifacts (HDF5 files), displaying the contained waterfall file and provides an interface
for extracing timestamped frequency measurements from it.

The latest codes is published using GitHub Actions on github-pages at <https://kerel-fs.github.io/spectranalysis/example.html>.

# Development Setup

This section describes how to setup a combined development environment for spectranalysis and
spectroplot.js.
1. Checkout spectroplot.js and register the package locally with `yarn link`:
   ```
   git clone https://github.com/kerel-fs/spectroplot-js
   cd spectroplot.js
   yarn install
   yarn link
   ```

2. Then checkout spectranalysis, link to the previously registered package and
   run a local webserver:
   ```
   git clone https://github.com/kerel-fs/spectranalysis
   yarn install
   yarn link "spectroplot"
   npx webpack serve
   ```

3. You can access the page at <http://localhost:8080/example.html> now.

# Deployment Setup

1. Run the following commands:
   ```
   git clone https://github.com/kerel-fs/spectranalysis
   yarn install
   npx webpack build
   ```

2. The complete output (html and css assets as well the bundled js) can be found in the `build` folder now.


# License

AGPL-3.0-or-later
