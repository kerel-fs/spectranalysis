import { EasyCloning } from './easy.js';

var myEasyCloning =  new EasyCloning('#spectros', document.location.hash.substring(1));

// Show version in footer
const spectroplot_hash = __DEP_SPECTROPLOT__.split('#')[1];
document.getElementById('footer_version').style.display = null;
document.getElementById('footer_version').innerHTML = '<span><a href="https://github.com/kerel-fs/spectranalysis">kerel-fs/spectranalyis</a>@' + __COMMIT_HASH__ +
                                                      '</span>, <span><a href="https://github.com/kerel-fs/spectroplot-js">kerel-fs/spectroplot.js</a>@'+ spectroplot_hash +
                                                      '</span>';
