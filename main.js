const express = require('express');
const path = require('path');
const app = express()
const Person = require('./models/person');
let model = [] //model

// set the view engine to ejs
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.json()); // Used to parse JSON bodies
app.use(express.urlencoded()); //Parse URL-encoded bodies

app.get('/',(req,res)=>{
    res.render('pages/index');
})

app.get('/people',(req,res)=>{
    res.render(('pages/people'), {data:model} );
})

app.get('/person',(req,res)=>{
    res.render('pages/person');
})

app.get('/person_update/:id',(req,res)=>{
    res.render('pages/person_update', {id_person: req.params.id} );
})

app.post('/person_detail',(req,res)=>{
    const {op, id_person, first_name, last_name} = req.body;
    const person = new Person(id_person,first_name,last_name);
    if (op === 'I'){
        model.push(person);
    } else if ( op === 'U'){
        for (let i = 0; i<model.length; i++){
            console.log(model[i].id_person, id_person);
            if (model[i].id_person == id_person){
                model[i].name = first_name;
                model[i].last_name = last_name;
                break
            }
        }
    }

    res.render(('pages/person_details'), {value: `Se agrego a la persona con { ID: ${person.id_person}, Name: ${person.name}, LastName: ${person.last_name} } correctamente.`});
})

app.get('/person_delete/:id',(req,res)=>{
    for (let i = 0; i<model.length; i++){
        if (model[i].id_person == req.params.id){
            model.pop(i);
            break
        }
    }
    res.render(('pages/people'), {data:model} );
})

app.listen(8080, ()=>{
    console.log(`App listening at http://localhost:${8080}`)
})