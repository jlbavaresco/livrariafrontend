import { useContext } from 'react'
import Alerta from '../Alerta';
import LivroContext from './LivroContext';

function Form() {

    const { objeto, handleChange, acaoCadastrar, listaEditoras, alerta } = useContext(LivroContext);

    return (
        <div className="modal fade" id="modalEdicao" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Livro</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form id="formulario" onSubmit={acaoCadastrar}>
                        <div className="modal-body">
                            <Alerta alerta={alerta} />
                            <div className="form-group">
                                <label htmlFor="txtCodido" className="form-label">
                                    Código
                                </label>
                                <input
                                    type="text"
                                    readOnly
                                    className="form-control"
                                    id="txtCodido"
                                    name="codigo"
                                    value={objeto.codigo}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="txtNome" className="form-label">
                                    Nome
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="txtNome"
                                    name="nome"
                                    value={objeto.nome}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="txtAutor" className="form-label">
                                    Autor
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="txtAutor"
                                    name="autor"
                                    value={objeto.autor}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="txtData" className="form-label">
                                    Data de lançamento
                                </label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="txtData"
                                    name="data_lancamento"
                                    value={objeto.data_lancamento}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="selectEditora" className="form-label">
                                    Editora
                                </label>
                                <select
                                    required
                                    className="form-control"
                                    id="selectselectEditoraPerson"
                                    value={objeto.editora}
                                    name="editora"
                                    onChange={handleChange}>
                                    <option disable="true" value="">(Selecione a editora)</option>
                                    {listaEditoras.map((editora) => (
                                        <option key={editora.codigo} value={editora.codigo}>
                                            {editora.nome}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                            <button type="submit" className="btn btn-success" >
                                Salvar  <i className="bi bi-save"></i>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default Form;