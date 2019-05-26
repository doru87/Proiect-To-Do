window.onload = function() {

    allTasks();

    document.querySelector(".cauta").setAttribute("onclick","find(this)");
    document.querySelector("#cauta").setAttribute("onclick","findTask(this)");
    document.querySelector("#listaTaskuri").setAttribute("onchange","selectTask(this)");

    var arrows =  document.querySelectorAll("label[class*='arrow']");

    arrows.forEach(function(arrow){
        arrow.setAttribute("onclick","displayPriorities(this)");
    });

    var radioButtons = document.querySelectorAll("input[type='radio']");
    radioButtons.forEach(function(radioButton){
        radioButton.setAttribute("onclick","selectPriority(this)");
    })

    $('.inchidere').click(function(event) {
        $('.popup').fadeOut(400);
      });

    var stari =  document.querySelectorAll("input[id*='stare']");

    stari.forEach(function(stare){
      if(stare.getAttribute('statustask')==1){
          var nume = stare.parentNode.parentNode.parentNode.childNodes.item(0);
          nume.setAttribute('style','text-decoration:line-through');
      }
    })

}

function find(elem){
    $('.popup').fadeIn(800);

}

function findTask(elem){
    const searchTask = document.querySelector('#searchText');

        let value = searchTask.value.toLowerCase().trim();
        const tasks = document.querySelectorAll('.content');

        tasks.forEach(function(task){
            var numeTask = task.childNodes.item(0).innerHTML;
            if(numeTask===value){
                task.style.display="block";
            }else{
                task.style.display="none";
            }

        });
}

function selectTask(elem){
    var tipTask = elem.options[elem.selectedIndex].value;
    var listaCheckboxuri = document.querySelectorAll("input[id*='stare']"); 

    listaCheckboxuri.forEach(function(checkbox){
        var valoareStatus = checkbox.getAttribute('statusTask');
        if(valoareStatus===tipTask){
            checkbox.parentNode.parentNode.parentNode.style.display="block";
        }else{
            checkbox.parentNode.parentNode.parentNode.style.display="none";
        }
    });
    
}

function displayPriorities(elem){

    elem.childNodes.item(1).addEventListener("change", function() {

        if(this.checked) {
            elem.previousSibling.setAttribute('style','display:block');
        }else{
            elem.previousSibling.setAttribute('style','display:none');
        }
    });
    
}

function selectPriority(elem){
  
    var task_name = elem.parentNode.parentNode.parentNode.childNodes.item(0).innerHTML;

    var tasks_array = JSON.parse(localStorage.getItem('tasks'));

    for (var j = 0; j < tasks_array.length; j++){
        if(tasks_array[j].name==task_name){
            tasks_array[j].priority=elem.value;

            if(tasks_array[j].priority=="low"){
                tasks_array[j].priority_code="2";
                localStorage.setItem('tasks',JSON.stringify(tasks_array));
            }
            else if(tasks_array[j].priority=="medium"){
                tasks_array[j].priority_code="1";
                localStorage.setItem('tasks',JSON.stringify(tasks_array));

            }else if(tasks_array[j].priority=="high"){
                tasks_array[j].priority_code="0";
                localStorage.setItem('tasks',JSON.stringify(tasks_array));
            }
           
            localStorage.setItem('tasks',JSON.stringify(tasks_array));
        }

      
    }
    setTimeout(function() {
        location.reload();
    }, 10);
}

function addAllTasks(taskName,taskDescription){
    var task={};
    task.name = taskName;
    task.description = taskDescription;
    task.active=0;
    task.priority="low";
    task.priority_code="";

    var array = JSON.parse(localStorage.getItem('tasks') || '[]');
    array.push(task);
    localStorage.setItem('tasks',JSON.stringify(array));
}

function deleteAllTask(elem){
    var task_name = elem.parentNode.childNodes.item(0).innerHTML;
    var tasks_array = JSON.parse(localStorage.getItem('tasks'));

        for (var j = 0; j < tasks_array.length; j++){
        if(tasks_array[j].name==task_name){
            tasks_array.splice(j,1);
        }
        localStorage.setItem('tasks',JSON.stringify(tasks_array));
    };

    setTimeout(function() {
        location.reload();
    }, 10);
}

function checkActive(elem){
    elem.addEventListener("change", function() {
         if(this.checked) {

            var active=1;
            var tasks_array = JSON.parse(localStorage.getItem('tasks'));
            var task_name = elem.parentNode.parentNode.parentNode.childNodes.item(0).innerHTML;
            var task = elem.parentNode.parentNode.parentNode.childNodes.item(0);
            task.setAttribute('style','text-decoration:line-through');
         
            for (var j = 0; j < tasks_array.length; j++){
                if(tasks_array[j].name==task_name){
                    tasks_array[j].active=active;
            
                    localStorage.setItem('tasks',JSON.stringify(tasks_array));
                }
            }
            elem.setAttribute('statusTask',active);
        
        }else{
            var active=0;
            var tasks_array = JSON.parse(localStorage.getItem('tasks'));
            var task_name = elem.parentNode.parentNode.parentNode.childNodes.item(0).innerHTML;
           
            for (var j = 0; j < tasks_array.length; j++){
                if(tasks_array[j].name==task_name){
                    tasks_array[j].active=active;
                    localStorage.setItem('tasks',JSON.stringify(tasks_array));
                }
            }
            elem.setAttribute('statusTask',active);

        }

    });
    
    setTimeout(function() {
        location.reload();
    }, 10);

}
function editAllTask(elem){

    var content = elem.parentNode;
    
    elem.setAttribute("disabled", true);
    
    var editareNume = document.createElement('input');
    editareNume.className="editareNume";
    editareNume.setAttribute('style','margin-top:3%;margin-left:2%;width:25%');
    
    var editareDescriere = document.createElement('textarea');
    editareDescriere.className="editareDescriere";
    editareDescriere.setAttribute('style','margin-top:3%; margin-left:2%; display:block;');
    editareDescriere.setAttribute('rows','4');
    editareDescriere.setAttribute('cols','65');
    editareDescriere.setAttribute('oninput','saveAllText(this)');

    var save = document.createElement("button");
    save.className="btn btn-success";
    save.setAttribute('onclick','saveButton(this)');
    save.setAttribute('style','margin-top:2%; margin-left:2%; display:block;');
    save.innerHTML = "Save";

    content.appendChild(editareNume);
    content.appendChild(editareDescriere);
    content.appendChild(save);

    var nume = elem.parentNode.childNodes.item(0).innerHTML;
    var nume_elem = elem.parentNode.childNodes.item(0);
    nume_elem.style.display = 'none'
    var descriere = elem.parentNode.childNodes.item(1).innerHTML;
    var descriere_elem = elem.parentNode.childNodes.item(1);
    descriere_elem.style.display = 'none'

    var editareNume = elem.parentNode.childNodes.item(7);
    editareNume.value = nume;
    var editareDescriere = elem.parentNode.childNodes.item(8);
    editareDescriere.value = descriere;

}

function saveButton(elem){

    var task_name = elem.parentNode.childNodes.item(0).innerHTML;
    var tasks_array = JSON.parse(localStorage.getItem('tasks'));
    var editareNume = elem.previousSibling.previousSibling;

    tasks_array.forEach((task) =>{
        if(editareNume.classList.contains('editareNume')){
            if(task.name==task_name){
                var name = editareNume.value;
                task.name=name;
                localStorage.setItem('tasks', JSON.stringify(tasks_array));
            }
        }
    });

    setTimeout(function() {
        location.reload();
    }, 10);
}

function saveAllText(elem){

    var task_description = elem.parentNode.childNodes.item(1).innerHTML;

    var tasks_array = JSON.parse(localStorage.getItem('tasks'));

    tasks_array.forEach((task) =>{
         if(elem.classList.contains('editareDescriere')){
            if(task.description==task_description){
                elem.addEventListener('input',function () {
                var description = elem.value;
                task.description=description;
                localStorage.setItem('tasks', JSON.stringify(tasks_array));
                });
            }
        }
    });
}

function comparePriorities(a,b){
    return a.priority_code-b.priority_code;
}

function allTasks(){
    var tasks_array = JSON.parse(localStorage.getItem('tasks'));
    var new_tasks_array = tasks_array.sort(comparePriorities);
    localStorage.setItem('tasks',JSON.stringify(new_tasks_array));
    var tasksPriorities = JSON.parse(localStorage.getItem('tasks'));
    var count=0;
    
    tasksPriorities.forEach((task) =>{
        count++
        var nume_task = document.createElement('div');
        nume_task.className="nume";
        var node = document.createTextNode(task.name);
  
        nume_task.appendChild(node);

        var descriere_task = document.createElement('div');
        descriere_task.className="descriere";
        var node = document.createTextNode(task.description);

        descriere_task.appendChild(node);

        var div = document.createElement('div');
        div.className="content";
        div.appendChild(nume_task);
        div.appendChild(descriere_task);

        var editTask = document.createElement("button");
        editTask.className = "edit btn btn-warning";  
        editTask.setAttribute('onclick','editAllTask(this)');
        editTask.innerHTML = "Editare";
        div.appendChild(editTask);

        var deleteTask = document.createElement("button");
        deleteTask.className = "delete btn btn-danger";  
        deleteTask.setAttribute('onclick','deleteAllTask(this)');
        deleteTask.innerHTML = "Stergere";
        div.appendChild(deleteTask);

        var container = document.createElement("div");
        container.className="containerCheckbox";
        div.appendChild(container);

        var outsideLabel = document.createElement("label");
        outsideLabel.className="outside";
        var activeSpan = document.createElement("span");
        activeSpan.innerHTML="Active";
        outsideLabel.appendChild(activeSpan);
        container.appendChild(outsideLabel);

        var stare = document.createElement("div");
        stare.className="stare";

        stareButon = document.createElement("input");
        stareButon.setAttribute('id','stare'+count);
        stareButon.setAttribute('type','checkbox');
        
        stareButon.setAttribute('statusTask',task.active);

        if(task.active==1){
            stareButon.setAttribute('checked','');
        }else{
            stareButon.removeAttribute('checked');
        }
        stareButon.setAttribute('onclick','checkActive(this)');
        var label = document.createElement("label");
        label.setAttribute('for','stare'+count);
        stare.appendChild(stareButon);
        stare.appendChild(label);
        container.appendChild(stare);

        var outsideLabel = document.createElement("label");
        outsideLabel.className="outside";
        var activeSpan = document.createElement("span");
        activeSpan.innerHTML="Completed";
        outsideLabel.appendChild(activeSpan);
        container.appendChild(outsideLabel);

        var prioritate = document.createElement("div");
        prioritate.className="prioritate";
       
        var selectie = document.createElement("div");
        selectie.className = "selectie";

        var low = document.createElement("input");
        low.setAttribute('id','low'+count);
        low.setAttribute('type','radio');
        low.setAttribute('value','low');
        var labelLow = document.createElement("label");
        labelLow.setAttribute('for','low'+count);
        labelLow.innerHTML="Low";

        var medium = document.createElement("input");
        medium.setAttribute('id','medium'+count);
        medium.setAttribute('type','radio');
        medium.setAttribute('value','medium');
        var labelMedium = document.createElement("label");
        labelMedium.setAttribute('for','medium'+count);
        labelMedium.innerHTML="medium";

        var high = document.createElement("input");
        high.setAttribute('id','high'+count);
        high.setAttribute('type','radio');
        high.setAttribute('value','high');
        var labelHigh = document.createElement("label");
        labelHigh.setAttribute('for','high'+count);
        labelHigh.innerHTML="high";
        
        selectie.appendChild(low);
        selectie.appendChild(medium);
        selectie.appendChild(high);

        selectie.appendChild(labelLow);
        selectie.appendChild(labelMedium);
        selectie.appendChild(labelHigh);
  
        prioritate.appendChild(selectie);
        div.appendChild(prioritate);

        var arrowInput = document.createElement("input");
        arrowInput.setAttribute('type','checkbox');

        var arrowLabel = document.createElement("label");
        arrowLabel.className="arrow"+count;

        var icon = document.createElement("i");
        icon.setAttribute('style','font-size:2.5em;');
        icon.className="fas fa-sign-in-alt";
        arrowLabel.appendChild(icon);
        arrowLabel.appendChild(arrowInput);

        div.appendChild(arrowLabel);
        
        if(task!==null){
            document.getElementById('list').appendChild(div);
        }
    });
}

document.getElementById('adauga').addEventListener('click', function(){

    var taskName = document.getElementById("nume").value;
    var taskDescription = document.getElementById("descriere").value;
    
    addAllTasks(taskName,taskDescription);

setTimeout(function() {
    location.reload();
}, 10);

});
