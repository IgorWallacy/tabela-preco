import React, { useEffect, useState, useRef } from "react";

import api from "../../../services/axios";
import { Dropdown } from "primereact/dropdown";
import { Button } from 'primereact/button'
import { Toast } from 'primereact/toast';
import { InputSwitch } from 'primereact/inputswitch';



const Configuracao = () => {
    const toast = useRef(null);

    const [usarSenhaPreferencial, setUsarSenhaPreferencial] = useState(false);
    const [usarSenhaNormal, setUsarSenhaNormal] = useState(true);

    const [loja, setLoja] = useState([]);
    const [lojaSelecionada, setLojaSelecionada] = useState(null);

    const [tabela, setTabela] = useState([]);
    const [tabelaSelecionada, setTabelaSelecionada] = useState(null);

    const salvarLocalStroagre = () => {

        const dados = {
            "loja": lojaSelecionada,
            "tabela": tabelaSelecionada,
            "habilitaSenhaPreferencial": usarSenhaPreferencial,
            "habilitarSenhaNormal": usarSenhaNormal
        }


        if (lojaSelecionada && tabelaSelecionada) {

            localStorage.setItem('tabela', JSON.stringify(dados))
            toast.current.show({ severity: 'success', summary: 'Sucesso', detail: 'Dados salvos!', life: 3000 });
        } else {
            toast.current.show({ severity: 'warn', summary: 'Atenção', detail: 'Selecione a loja e tabela para exibição', life: 3000 });
        }

    }

    const getLojas = () => {
        return api.get("/api_public/tabelapreco/configuracao").then((r) => {
            setLoja(r.data);
        });
    };

    const getTabelas = () => {
        return api.get("/api_public/tabelapreco/todas").then((r) => {
            setTabela(r.data);
        });
    };
    useEffect(() => {
        getLojas();
        getTabelas();
    }, []);

    return (
        <>
            <Toast ref={toast} />
            <div className="w-full flex justify-center items-end gap-5">
                <div className="text-2xl">
                    <h1>Loja</h1>
                    <Dropdown
                        value={lojaSelecionada}
                        options={loja}
                        onChange={(e) => setLojaSelecionada(e.value)}
                        optionLabel="idfilial"
                        placeholder="Selecione uma loja"
                    />
                </div>

                <div className="text-2xl">
                    <h1>Tabela</h1>
                    <Dropdown
                        value={tabelaSelecionada}
                        options={tabela}
                        onChange={(e) => setTabelaSelecionada(e.value)}
                        optionLabel="descricao"
                        placeholder="Selecione uma tabela"
                    />
                </div>

                <div className="text-2xl">
                    <h1 className="m-2">Habilitar senha preferencial</h1>
                    <InputSwitch checked={usarSenhaPreferencial} onChange={(e) => setUsarSenhaPreferencial(e.value)} />
                </div>

                <div className="text-2xl">
                    <h1 className="m-2">Habilitar senha normal</h1>
                    <InputSwitch checked={usarSenhaNormal} onChange={(e) => setUsarSenhaNormal(e.value)} />
                </div>

                <Button onClick={() => salvarLocalStroagre()} style={{ margin: '5px' }} icon="pi pi-save" label="Gravar" className="p-button p-button-rounded p-button-success p-button-lg" />

            </div>
        </>
    );
};

export default Configuracao;
