var pop_up =document.getElementById('id01')
var amount_json = []
window.onclick = function(event) {
    if (event.target == pop_up) {
        pop_up.style.display= "none";
        thead.className = "table-dark text-center sticky-top"
        build_html(amount_json)
        process_balance(amount_json);
    }
  }
  document.getElementById("date_dom").value = new Date
  var thead = document.getElementById("thead")
  var bottom_thead = document.getElementById("bottom_thead")
function access_pop_up(obj){
    thead.className = "table-dark text-center"
    bottom_thead.className = "table-light text-center"
    var buttons = obj
    var model_pop_up = document.getElementById("id01")
    model_pop_up.style.display='block';
    var current_id = buttons.id;
    var header =  document.getElementById("header")
    var footer = document.getElementById("footer")
    var heading = header.children[1]
    var model_content = document.getElementById("model_content")
    if (current_id=="expense"){
        model_content.children[0].innerText ="Expense Name"
        heading.innerText = "Expense"
        header.className = "w3-container w3-red";
        footer.className = "w3-container w3-red";
    }
    else{
        model_content.children[0].innerText ="Remitter Name"
        heading.innerText = "Amount Top Up"
        header.className = "w3-container w3-green";
        footer.className = "w3-container w3-green";
    }
}

var id_count = 0
function save_btn(obj){
    thead.className = "table-dark text-center sticky-top"
    bottom_thead.className = "table-light text-center sticky-top"
    pop_up.style.display= "none";
    var popup_div = obj.parentNode.parentNode
    var heading_name = popup_div.children[0].children[1].innerText
    if(heading_name == "Expense"){
     create_json("Expense")   
    }
    else{
       create_json("TopUp")
    }
    id_count++; 
    save_to_ls(amount_json);
    build_html(amount_json)
    process_balance(amount_json);

}
function create_json(type){
    var expense_name = document.getElementById("Expense_name").value
    var amount = document.getElementById("amount").value
    var date = document.getElementById("date").value
    var mop = document.getElementById("mop").value
    if (expense_name && amount && date !== "" ){
    expense_json = {id:id_count,type:type,expense_name:expense_name,amount:amount,date:date,mop:mop}
    amount_json.push(expense_json)}
    else{
        alert("You haven't completed the credentials")
        pop_up.style.display= "inline"; 
        bottom_thead.className = "table-light text-center"
    }
}

function build_html(json_file){
    var table = document.getElementById("main_table")
    table.innerHTML = "";
    document.getElementById("Expense_name").value = "";
    document.getElementById("amount").value ="";
    
    for (let i =0;i<json_file.length;i++){
        var each_file = json_file[i]
        
    
        var tr = document.createElement("tr")
        if (each_file.type == "Expense"){
            tr.className = "table-danger"
        }
        else{
            tr.className = "table-success"
        }
        var td = document.createElement("td")
        td.innerText = each_file["id"]
        td.style.display = "none"
        tr.appendChild(td)
        var td = document.createElement("td")
        td.innerText = each_file["type"]
        tr.appendChild(td)
        var td = document.createElement("td")
        td.innerText = each_file["date"]
        tr.appendChild(td)
        var td = document.createElement("td")
        td.innerText = each_file["amount"]
        tr.appendChild(td)
        var td = document.createElement("td")
        td.innerText = each_file["mop"]
        tr.appendChild(td)
        tr.addEventListener("click", details)
        table.appendChild(tr)

    }
}

function process_balance(json_file){
    var card_expense =0 ;
    var cash_expense =0;
    var card_topup =0;
    var cash_topup =0;
    for (let i=0;i<json_file.length;i++){
        var each_object = json_file[i];
        if(each_object["mop"]== "card" && each_object["type"] == "Expense"){
            card_expense += parseInt( each_object["amount"])
            
        }
        else if (each_object["mop"]== "cash" && each_object["type"] == "Expense"){
            cash_expense += parseInt( each_object["amount"])
            
        }
        else if (each_object["mop"]== "card" && each_object["type"] == "TopUp"){
            card_topup += parseInt( each_object["amount"])
            
        }
        else if (each_object["mop"]== "cash" && each_object["type"] == "TopUp"){
            cash_topup += parseInt( each_object["amount"])
              
        }
    }
    var total_expense = card_expense + cash_expense;
    var card_balance =  card_topup - card_expense;
    var cash_balance = cash_topup - cash_expense;
    document.getElementById("card_balance").innerText = card_balance;
    document.getElementById("cash_balance").innerText = cash_balance;
    document.getElementById("balance").innerText = total_expense
}

function save_to_ls(json){
    var string_josn = JSON.stringify(json)
    localStorage.setItem("expense_tracker_json", string_josn);
}

function extract_ls(){
    var json = localStorage.getItem("expense_tracker_json")
    if (json !== null || ""){
        var json_file = JSON.parse(json)
        amount_json = json_file
        build_html(json_file)
        process_balance(json_file)
        id_count_from_ls = parseInt(json_file[json_file.length -1]["id"])
        id_count = id_count_from_ls + 1
        
    }
}
