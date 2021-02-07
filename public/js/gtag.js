import getConfig from "next/config";
<!-- Global site tag (gtag.js) - Google Analytics -->

window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

let {GTagId} = getConfig();
if (!GTagId)
    console.error('GTAG_ID não encontrado.', GTagId);
gtag('config', GTagId);