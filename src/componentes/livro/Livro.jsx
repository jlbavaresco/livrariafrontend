import { useState, useEffect } from 'react';
import config from '../../Config';
import LivroContext from './LivroContext';
import Tabela from './Tabela';
import Form from './Form';

function Livro() {

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [listaEditoras, setListaEditoras] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({
        codigo: "", nome: "", autor: "", data_lancamento : null, editora : ""
    })


    const recuperaEditoras = async () => {
        await fetch(`${config.enderecoapi}/editoras`)
            .then(response => response.json())
            .then(data => setListaEditoras(data))
            .catch(err => console.log('Erro: ' + err))
    }

    const recuperaLivros = async () => {
        await fetch(`${config.enderecoapi}/livros`)
            .then(response => response.json())
            .then(data => setListaObjetos(data))
            .catch(err => console.log('Erro: ' + err))
    }    

    const remover = async objeto => {
        if (window.confirm('Deseja remover este objeto?')) {
            try {
                await fetch(`${config.enderecoapi}/livros/${objeto.codigo}`,
                    { method: "DELETE" })
                    .then(response => response.json())
                    .then(json => setAlerta({ status: json.status, message: json.message }))
                recuperaLivros();
            } catch (err) {
                console.log('Erro: ' + err)
            }
        }
    }

    const recuperar = async codigo => {
        await fetch(`${config.enderecoapi}/livros/${codigo}`)
            .then(response => response.json())
            .then(data => setObjeto(data[0]))
            .catch(err => console.log(err))
    }

    const acaoCadastrar = async e => {

        e.preventDefault();
        if (editar) {
            try {
                const body = {
                    codigo: objeto.codigo,
                    nome: objeto.nome,
                    autor: objeto.autor,
                    data_lancamento : objeto.data_lancamento, 
                    editora : objeto.editora
                };
                await fetch(config.enderecoapi + '/livros', {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body),
                }).then(response => response.json())
                    .then(json => {
                        //console.log("JSON retorno: " + "status: " + json.status + " Message: " + json.message)                    
                        setAlerta({ status: json.status, message: json.message })
                    });
            } catch (err) {
                console.error(err.message);
            }
        } else {
            try {
                const body = {
                    nome: objeto.nome,
                    autor: objeto.autor,
                    data_lancamento : objeto.data_lancamento, 
                    editora : objeto.editora
                };
                await fetch(config.enderecoapi + '/livros', {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body),
                }).then(response => response.json())
                    .then(json => {
                        //console.log("JSON retorno: " + "status: " + json.status + " Message: " + json.message)                    
                        setAlerta({ status: json.status, message: json.message })
                    });
            } catch (err) {
                console.error(err.message);
            }
        }
        recuperaLivros();
    };

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value });
    }

    useEffect(() => {
        recuperaEditoras();
        recuperaLivros();
    }, []);

    return (
        <LivroContext.Provider value={
            {
                objeto, setObjeto,
                alerta, setAlerta,
                listaObjetos, setListaObjetos,
                listaEditoras, setListaEditoras,
                editar, setEditar,
                recuperaEditoras,
                recuperar,
                remover,
                acaoCadastrar,
                handleChange
            }
        }>
            <Tabela />
            <Form />
        </LivroContext.Provider>
    );
}

export default Livro;