import { useState, useEffect } from 'react';
import config from '../../Config';
import EditoraContext from './EditoraContext';
import Tabela from './Tabela';
import Form from './Form';

function Editora() {

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({
        codigo: "", nome: "", site: ""
    })

    const recuperaEditoras = async () => {
        await fetch(`${config.enderecoapi}/editoras`)
            .then(response => response.json())
            .then(data => setListaObjetos(data))
            .catch(err => console.log('Erro: ' + err))
    }

    const remover = async objeto => {
        if (window.confirm('Deseja remover este objeto?')) {
            try {
                await fetch(`${config.enderecoapi}/editoras/${objeto.codigo}`,
                    { method: "DELETE" })
                    .then(response => response.json())
                    .then(json => setAlerta({ status: json.status, message: json.message }))
                recuperaEditoras();
            } catch (err) {
                console.log('Erro: ' + err)
            }
        }
    }

    const recuperar = async codigo => {
        await fetch(`${config.enderecoapi}/editoras/${codigo}`)
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
                    site: objeto.site
                };
                await fetch(config.enderecoapi + '/editoras', {
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
                    site: objeto.site
                };
                await fetch(config.enderecoapi + '/editoras', {
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
        recuperaEditoras();
    };

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value });
    }

    useEffect(() => {
        recuperaEditoras();
    }, []);

    return (
        <EditoraContext.Provider value={
            {
                objeto, setObjeto,
                alerta, setAlerta,
                listaObjetos, setListaObjetos,
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
        </EditoraContext.Provider>
    );
}

export default Editora;