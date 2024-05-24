(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()


// let showText = () => {
//   let taxes = document.getElementsByClassName("taxes");
//   for(taxe of taxes){
//     if(show_gst_btn.checked){
//       taxe.style.visibility = "visible";
//     }else{
//       taxe.style.visibility = "hidden";
//     }
//   }
// }