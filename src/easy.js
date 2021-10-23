/**
    @file Spectroplot easy template cloning.

    @author Christian W. Zuckschwerdt <zany@triq.net>
    @copyright Christian W. Zuckschwerdt, 2019
    @license
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 2 of the License, or
    (at your option) any later version.
*/

import { Spectroplot, loadUrl } from 'spectroplot';
import { DropZone } from 'spectroplot/lib/dropzone.js';
import { selector } from 'spectroplot/lib/utils.js';

export { EasyCloning }

/**
    An example easy template cloning class.
*/
class EasyCloning {
    /**
        Initialize a new EasyCloning.
        @example
        new EasyCloning('#spectros', document.location.hash.substring(1))

        @param {Object|string} elementOrSelector - Parent element or selector
        @param {string} [dataUrl] - URL to load data from
    */
    constructor(elementOrSelector, dataUrl) {
        this.cloneParent = selector(elementOrSelector);
        // grab the template and remove from DOM
        this.cloneTemplate = this.cloneParent.firstElementChild;
        // this.cloneTemplate.remove(); // would need polyfill on IE
        this.cloneParent.removeChild(this.cloneTemplate);

        this.dropZone = new DropZone('#dropZone', this.cloneLoader.bind(this));
        this.dropZone.addInput('#inputfile');
        // this.dropZone.addInput('#addfile');

        if (dataUrl) {
            this.loadUrl(dataUrl);
        }

        this.enableObservationSelectClick();
    }

    /**
        Load data into a new clone.

        @param {Object} [filedata] - data object to load
    */
    cloneLoader(filedata) {
        const parent_node = this.cloneTemplate.cloneNode(true);
        this.cloneParent.appendChild(parent_node);

        const options = {
          'parent': parent_node,
          'filedata': filedata,
        };
        const spectroplot = new Spectroplot(options);
        spectroplot.enableGuides();
        spectroplot.enableButtons();
        spectroplot.enableCanvasClick();
        // spectroplot.createDropZone($refs.dropzone)
    }

    /**
        Load data from a URL.

        @param {string} [dataUrl] - URL to load data from
    */
    loadUrl(dataUrl) {
        const cloneLoaderBind = this.cloneLoader.bind(this);
        loadUrl(dataUrl, cloneLoaderBind);
    }


    enableObservationSelectClick() {
        const btn = document.getElementById('form-select-obs-btn');
        let this_cloning = this;
        btn.addEventListener('click', function(e) {
            // const satnogs_db_api = "https://db.satnogs.org/api";
            const satnogs_db_api = "http://localhost:8000/api";
            // const satnogs_db_api = "https://db-dev.satnogs.org/api";

            const observation_id = document.getElementById('form-select-obs-id').value;
            if (!/^[0-9]+$/.test(observation_id)) {
                alert("Invalid observation id!");
                return;
            }
            const token = document.getElementById('form-select-token').value;
            const resource = new URL(satnogs_db_api + "/artifacts/?network_obs_id=" + observation_id);
            let myHeaders = new Headers();
            myHeaders.append('Authorization', 'Token ' + token);
            fetch(resource, {
              method: 'GET',
              headers: myHeaders,
            })
                .then(response => response.json())
                .then(data => {
                    if (data.length != 1 || data[0]['network_obs_id'] != observation_id) {
                        console.log("ERROR: Unexpected DB API response: ");
                        console.log(data);
                        return;
                    }
                    const artifact_url = data[0]['artifact_file'];
                    this_cloning.loadUrl(artifact_url, this.cloneLoader);
                });
        });
    }
}
