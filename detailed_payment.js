var pd_type = document.getElementById("PD_type")
var pd_expense_name = document.getElementById("PD_expense_name")
var pd_expense_amount = document.getElementById("PD_expense_amount")
var pd_date = document.getElementById("PD_date")
var pd_mop = document.getElementById("PD_mop")



// Get the modal
var modal = document.getElementById('myModal');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
var td_obj 
function details(){
console.log(this.children[0].innerText)
var tr_id =parseInt(this.children[0].innerText)
for (let i =0;i< amount_json.length;i++){
    var each_obj = amount_json[i]
    if (each_obj.id == tr_id){
        td_obj = each_obj

    }
}
pd_type.value = td_obj.type
pd_expense_name.value = td_obj.expense_name
pd_expense_amount.value = td_obj.amount
pd_date.value = td_obj.date
pd_mop.value = td_obj.mop
  


    modal.style.display = "block";
    thead.className = "table-dark text-center"
    bottom_thead.className = "table-light text-center"

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
    thead.className = "table-dark text-center sticky-top"
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        thead.className = "table-dark text-center sticky-top"
    }
}
}

function save_pd(){
    modal.style.display = "none";
    thead.className = "table-dark text-center sticky-top";

    td_obj.type = pd_type.value 
    td_obj.expense_name = pd_expense_name.value 
    td_obj.amount = pd_expense_amount.value 
    td_obj.date = pd_date.value 
    td_obj.mop =pd_mop.value 
    save_to_ls(amount_json);
    build_html(amount_json)
    process_balance(amount_json);
}

function delete_pd(){
    modal.style.display = "none";
    thead.className = "table-dark text-center sticky-top";
    for (let i=0;i<amount_json.length;i++){
        var each_obj = amount_json[i]
        if (each_obj.id == td_obj.id){
            amount_json.splice(i,1)
            console.log(amount_json)
        }
    }
    save_to_ls(amount_json);
    build_html(amount_json)
    process_balance(amount_json);
}