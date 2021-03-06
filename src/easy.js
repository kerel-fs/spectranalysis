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
import { persistInput } from './utils.js';

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
        @param {string} [observation_url] - URL to load the observation
    */
    constructor(elementOrSelector, observation_id) {
        this.cloneParent = selector(elementOrSelector);
        // grab the template and remove from DOM
        this.cloneTemplate = this.cloneParent.firstElementChild;
        // this.cloneTemplate.remove(); // would need polyfill on IE
        this.cloneParent.removeChild(this.cloneTemplate);

        this.dropZone = new DropZone('#dropZone', this.cloneLoader.bind(this));
        this.dropZone.addInput('#inputfile');
        // this.dropZone.addInput('#addfile');

        this.enableButtons();
        this.enableTokenStorage();

        if (observation_id) {
            this.loadArtifact(observation_id);
        }
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
        this.spectroplot = new Spectroplot(options);
        this.spectroplot.enableGuides();
        this.spectroplot.enableButtons();
        this.spectroplot.enableCanvasClick();
        // spectroplot.createDropZone($refs.dropzone)

        // Hide the "Loading..." message & the input form
        document.getElementById('form1-message').style.display = 'none';
        document.getElementById('input-methods').style.display = 'none';
    }

    /**
        Load data from a URL.

        @param {string} [dataUrl] - URL to load data from
    */
    loadUrl(dataUrl) {
        const cloneLoaderBind = this.cloneLoader.bind(this);
        loadUrl(dataUrl, cloneLoaderBind);
    }


    enableButtons() {
        document.getElementById('form-select-show-token')
            .addEventListener('click', this.showTokenClicked.bind(this));
        document.getElementById('form-select-obs-btn')
            .addEventListener('click', this.selectObsBtnClicked.bind(this));
        document.getElementById('form2-btn')
            .addEventListener('click', this.downloadMeasurementsClicked.bind(this));
        document.getElementById('form-overlay-btn')
            .addEventListener('click', this.overlayLocalClicked.bind(this));
        document.getElementById('form-tle-btn')
            .addEventListener('click', this.overlayRemoteClicked.bind(this));
    }

    overlayLocalClicked(e) {
        // Enable local transmitter overlay
        this.spectroplot.showOverlayLocal = true;
        this.spectroplot.processData();
    }
    overlayRemoteClicked(e) {
        // Enable remote transmitter overlay
        this.spectroplot.showOverlayRemote = true;
        this.spectroplot.processData();
    }

    downloadMeasurementsClicked(e) {
        const encodedUri = this.spectroplot.getMeasurements();

        let link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "measurements.dat");
        document.body.appendChild(link);
        link.click()
        document.body.removeChild(link);
    }

    showTokenClicked(e) {
        let x = document.getElementById("form-select-token");
        if (x.type === "password") {
          x.type = "text";
        } else {
          x.type = "password";
        }
    }

    selectObsBtnClicked(e) {
        const observation_id = document.getElementById('form-select-obs-id').value;
        this.loadArtifact(observation_id);
    }

    loadArtifact(observation_id) {
        let message = document.getElementById('form1-message');

        if (!/^[0-9]+$/.test(observation_id)) {
            message.innerHTML = "Invalid observation id!";
            message.style.display = null;
            return;
        }

        message.innerHTML = "Loading...";
        message.style.display = null;

        const satnogs_db_api = document.getElementById('form-select-url').value;
        const observation_url = new URL(satnogs_db_api + "/artifacts/?network_obs_id=" + observation_id);

        const token = document.getElementById('form-select-token').value;

        let myHeaders = new Headers();
        myHeaders.append('Authorization', 'Token ' + token);
        fetch(observation_url, {
          method: 'GET',
          headers: myHeaders,
        })
            .then(response => response.json())
            .then(data => {
                if (data.length != 1) {
                    message.innerHTML = "ERROR: Unexpected DB API response: <br/>" + data['detail']
                    + "<br/> Please check that SatNOGS DB API URL and SatNOGS DB API Token are correct.";
                    message.style.display = null;
                    return;
                }
                let artifact_url = data[0]['artifact_file'];
                artifact_url = artifact_url.replace("http://","https://");
                this.loadUrl(artifact_url, this.cloneLoader);
            })
            .catch(error => {
                    message.innerHTML = "ERROR: API Request failed. Reason:<br/>" + error;
                    message.style.display = null;
                    console.log(error);
            });
    }

    enableTokenStorage() {
        /* Store the form input for SatNOGS DB API Token & URL in localStorage */
        persistInput(document.getElementById('form-select-token'));
        persistInput(document.getElementById('form-select-url'));

        /* For debugging: Store all other input fields in localStorage as well */
        persistInput(document.getElementById('form-select-obs-id'));
        persistInput(document.getElementById('form-overlay-local-offset'));
        persistInput(document.getElementById('form-overlay-remote-tle'));
        persistInput(document.getElementById('form-overlay-remote-offset'));
    }
}
