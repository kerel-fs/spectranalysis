import { EasyCloning } from './easy.js';

var myEasyCloning =  new EasyCloning('#spectros', document.location.hash.substring(1));

// Show version in footer
document.getElementById('footer_version').style.display = null;
document.getElementById('footer_version').innerHTML = '<span>kerel-fs/spectranalyis#' + __COMMIT_HASH__ +
                                                      '</span>, <span>'+ __DEP_SPECTROPLOT__ +
                                                      '</span>';
