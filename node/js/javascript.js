(function readyJs(win, doc){
    if (document.querySelectorAll('.deletar')){
         for (let i=0; i< doc.querySelectorAll('.deletar').length; i++) {
            doc.querySelectorAll('.deletar')[i].addEventListener('click', function(event){
                if (confirm("Deseja  apagar esse dado?")) {
                    return true;
                } else {
                    event.preventDefault();
                }
            });
         }
    }
})(window,document)