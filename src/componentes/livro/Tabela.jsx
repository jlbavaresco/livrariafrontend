import { useContext } from 'react'
import LivroContext from './LivroContext';
import Alerta from '../Alerta';

function Tabela() {

    const { setObjeto, alerta, setAlerta, listaObjetos, setEditar, recuperar, remover} = useContext(LivroContext);

    return (
        <div style={{ padding: '20px' }}>
        <h1>Livros</h1>
        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalEdicao"
            onClick={() => {
                setObjeto({
                    codigo: "", nome: "", autor: "", data_lancamento :  new Date().toISOString().slice(0, 10), editora : ""
                });
                setEditar(false);
                setAlerta({ status: "", message: "" });
            }}>
            Novo <i className="bi bi-file-earmark-plus"></i>
        </button>
        <Alerta alerta={alerta} />
        {listaObjetos.length === 0 && <h1>Nenhuma editora encontrada</h1>}
        {listaObjetos.length > 0 && (
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col" style={{ textAlign : 'center' }}>Ações</th>
                        <th scope="col">Código</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Autor</th>
                        <th scope="col">Data de Lançamento</th>
                        <th scope="col">Editora</th>
                    </tr>
                </thead>
                <tbody>
                    {listaObjetos.map(objeto => (
                        <tr key={objeto.codigo}>
                            <td align="center">
                                <button className="btn btn-info"
                                    data-bs-toggle="modal" data-bs-target="#modalEdicao"
                                    onClick={() => {
                                        recuperar(objeto.codigo);
                                        setEditar(true);
                                        setAlerta({ status: "", message: "" });
                                    }}>
                                    <i className="bi bi-pencil-square"></i>
                                </button>
                                <button className="btn btn-danger" title="Remover"
                                    onClick={() => { remover(objeto); }}>
                                    <i className="bi bi-trash"></i>
                                </button>
                            </td>
                            <td>{objeto.codigo}</td>
                            <td>{objeto.nome}</td>
                            <td>{objeto.autor}</td>
                            <td>{objeto.data_lancamento}</td>
                            <td>{objeto.editora_nome}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )}
    </div>
    )
}

export default Tabela;