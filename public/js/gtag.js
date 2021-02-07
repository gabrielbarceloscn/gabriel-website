<!-- Global site tag (gtag.js) - Google Analytics -->

window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

let id = process.env.GTAG_ID;
if (!id)
    console.error('GTAG_ID não encontrado.', id);
gtag('config', );