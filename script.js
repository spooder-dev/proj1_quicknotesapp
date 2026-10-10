const form=document.querySelector("#note-form");
const input=document.querySelector("#note-input");
const category=document.querySelector("#note-category");
const list=document.querySelector("#notes-list");
const count=document.querySelector("#note-count");
const error=document.querySelector("#error-message");
const search=document.querySelector("#search-input");

let notes=JSON.parse(localStorage.getItem("notes"))||[];

function save(){
localStorage.setItem("notes",JSON.stringify(notes));
}

function updateCount(){

if(notes.length===0){
count.textContent="You have no notes yet.";
}
else if(notes.length===1){
count.textContent="You have 1 note.";
}
else{
count.textContent=`You have ${notes.length} notes.`;
}

}

function render(filter=""){

list.innerHTML="";

const filtered=notes.filter(note=>
note.text.toLowerCase().includes(filter.toLowerCase())
);

if(filtered.length===0){

const li=document.createElement("li");
li.textContent="No notes match your search.";
list.appendChild(li);

updateCount();
return;

}

filtered.forEach(note=>{

const li=document.createElement("li");

li.classList.add(`category-${note.category}`);

const text=document.createElement("p");
text.textContent=note.text;

const cat=document.createElement("small");
cat.textContent=note.category;

const date=document.createElement("small");
date.textContent=" | "+note.createdAt;

const del=document.createElement("button");
del.textContent="Delete";

del.addEventListener("click",()=>{

notes=notes.filter(n=>n.id!==note.id);

save();

render(search.value);

});

li.appendChild(text);
li.appendChild(cat);
li.appendChild(date);
li.appendChild(document.createElement("br"));
li.appendChild(del);

list.appendChild(li);

});

updateCount();

}

form.addEventListener("submit",(e)=>{

e.preventDefault();

const text=input.value.trim();

if(text===""){

error.textContent="Please type a note first.";

return;

}

if(text.length>200){

error.textContent="Notes must be 200 characters or fewer.";

return;

}

error.textContent="";

notes.push({

id:Date.now(),

text:text,

category:category.value,

createdAt:new Date().toLocaleString()

});

save();

render(search.value);

input.value="";

});

search.addEventListener("input",()=>{

render(search.value);

});

render();